import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import api from "../lib/api.js";
import useGlobalError from "../context/useGlobalError.js";
import getErrorMessage from "../lib/errorMessage.js";
import { datePresets, resolveVisitedAt } from "../lib/datePresets.js";

export default function NewVisit() {
  const navigate = useNavigate();
  const [clinicians, setClinicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalError, clearGlobalError } = useGlobalError();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [cRes, pRes] = await Promise.all([
          api.get("/api/clinicians"),
          api.get("/api/patients"),
        ]);
        setClinicians(cRes.data);
        setPatients(pRes.data);
        clearGlobalError();
      } catch (err) {
        setGlobalError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formik = useFormik({
    initialValues: {
      clinicianId: "",
      patientId: "",
      datePreset: "today",
      customDate: "",
      notes: ""
    },
    onSubmit: async (values, helpers) => {
      try {
        const visitedAt = resolveVisitedAt(values.datePreset, values.customDate);
        await api.post("/api/visits", {
          clinicianId: values.clinicianId,
          patientId: values.patientId,
          visitedAt: visitedAt ? visitedAt.toISOString() : undefined,
          notes: values.notes || undefined
        });
        clearGlobalError();
        helpers.resetForm();
        navigate("/visits");
      } catch (err) {
        setGlobalError(getErrorMessage(err));
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">New Visit</h1>
          <Link to="/" className="text-sm text-slate-600">
            Home
          </Link>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">Create Visit</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="visit-clinician">
                Clinician
              </label>
              <select
                id="visit-clinician"
                name="clinicianId"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                value={formik.values.clinicianId}
                onChange={formik.handleChange}
                disabled={loading}
              >
                <option value="">
                  {loading ? "Loading clinicians..." : "Select clinician"}
                </option>
                {clinicians.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="visit-patient">
                Patient
              </label>
              <select
                id="visit-patient"
                name="patientId"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                value={formik.values.patientId}
                onChange={formik.handleChange}
                disabled={loading}
              >
                <option value="">
                  {loading ? "Loading patients..." : "Select patient"}
                </option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="visit-date-preset">
                Visit Date
              </label>
              <select
                id="visit-date-preset"
                name="datePreset"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                value={formik.values.datePreset}
                onChange={formik.handleChange}
              >
                {datePresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="visit-custom-date">
                Custom Date
              </label>
              <input
                id="visit-custom-date"
                name="customDate"
                type="date"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                value={formik.values.customDate}
                onChange={formik.handleChange}
                disabled={formik.values.datePreset !== "custom"}
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="visit-notes">
                Notes
              </label>
              <input
                id="visit-notes"
                name="notes"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save Visit"}
          </button>
        </form>
      </div>
    </div>
  );
}
