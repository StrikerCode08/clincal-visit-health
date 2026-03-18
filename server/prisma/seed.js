import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const clinicians = await prisma.clinician.createMany({
    data: [
      { name: "Dr. Maya Rao", email: "maya.rao@clinic.local", specialty: "Cardiology" },
      { name: "Dr. Arjun Mehta", email: "arjun.mehta@clinic.local", specialty: "Dermatology" },
      { name: "Dr. Leena Patel", email: "leena.patel@clinic.local", specialty: "Pediatrics" }
    ],
    skipDuplicates: true
  });

  const patients = await prisma.patient.createMany({
    data: [
      { name: "Riya Sharma", email: "riya.sharma@patient.local", phone: "+1-555-0101" },
      { name: "Karan Singh", email: "karan.singh@patient.local", phone: "+1-555-0102" },
      { name: "Ananya Gupta", email: "ananya.gupta@patient.local", phone: "+1-555-0103" },
      { name: "Rahul Verma", email: "rahul.verma@patient.local", phone: "+1-555-0104" }
    ],
    skipDuplicates: true
  });

  const clinicianList = await prisma.clinician.findMany({ orderBy: { id: "asc" } });
  const patientList = await prisma.patient.findMany({ orderBy: { id: "asc" } });

  if (clinicianList.length && patientList.length) {
    await prisma.visit.createMany({
      data: [
        {
          clinicianId: clinicianList[0].id,
          patientId: patientList[0].id,
          visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
          notes: "Routine follow-up. Vitals stable."
        },
        {
          clinicianId: clinicianList[1].id,
          patientId: patientList[1].id,
          visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          notes: "Skin rash improved with topical treatment."
        },
        {
          clinicianId: clinicianList[2].id,
          patientId: patientList[2].id,
          visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
          notes: "Pediatric check-up completed. Vaccines updated."
        },
        {
          clinicianId: clinicianList[0].id,
          patientId: patientList[3].id,
          visitedAt: new Date(),
          notes: "Initial consultation scheduled next steps."
        }
      ]
    });
  }

  console.log("Seed data inserted.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
