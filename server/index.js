import express from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const port = process.env.PORT || 5174;
const prisma = new PrismaClient();

app.use(express.json());

const clinicianCreateSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("valid email is required"),
  specialty: z.string().min(1).optional()
});

const patientCreateSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional()
});

const visitCreateSchema = z.object({
  clinicianId: z.coerce.number().int().positive(),
  patientId: z.coerce.number().int().positive(),
  visitedAt: z.coerce.date().optional(),
  notes: z.string().min(1).optional()
});

const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "validation_error",
      details: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }
  req.body = result.data;
  next();
};

app.get("/api/health", async (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/clinicians", async (req, res) => {
  const clinicians = await prisma.clinician.findMany({ orderBy: { id: "asc" } });
  res.json(clinicians);
});

app.post("/api/clinicians", validateBody(clinicianCreateSchema), async (req, res) => {
  const { name, email, specialty } = req.body;
  const clinician = await prisma.clinician.create({
    data: { name, email, specialty }
  });
  res.status(201).json(clinician);
});

app.get("/api/patients", async (req, res) => {
  const patients = await prisma.patient.findMany({ orderBy: { id: "asc" } });
  res.json(patients);
});

app.post("/api/patients", validateBody(patientCreateSchema), async (req, res) => {
  const { name, email, phone } = req.body;
  const patient = await prisma.patient.create({
    data: { name, email, phone }
  });
  res.status(201).json(patient);
});

app.get("/api/visits", async (req, res) => {
  const visits = await prisma.visit.findMany({
    orderBy: { visitedAt: "desc" },
    include: { clinician: true, patient: true }
  });
  res.json(visits);
});

app.post("/api/visits", validateBody(visitCreateSchema), async (req, res) => {
  const { clinicianId, patientId, visitedAt, notes } = req.body;
  const visit = await prisma.visit.create({
    data: {
      clinicianId,
      patientId,
      visitedAt,
      notes
    },
    include: { clinician: true, patient: true }
  });
  res.status(201).json(visit);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal_server_error" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
