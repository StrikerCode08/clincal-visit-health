import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import api from "../lib/api.js";
import useGlobalError from "../context/useGlobalError.js";
import getErrorMessage from "../lib/errorMessage.js";

export default function Patients() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalError, clearGlobalError } = useGlobalError();

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/patients");
      setItems(res.data);
      clearGlobalError();
    } catch (err) {
      setGlobalError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "" },
    onSubmit: async (values, helpers) => {
      try {
        await api.post("/api/patients", values);
        helpers.resetForm();
        await load();
        clearGlobalError();
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
          <h1 className="text-2xl font-semibold text-slate-900">Patients</h1>
          <Link to="/" className="text-sm text-slate-600">
            Home
          </Link>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">Add Patient</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="patient-name">
                Name
              </label>
              <input
                id="patient-name"
                name="name"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="patient-email">
                Email
              </label>
              <input
                id="patient-email"
                name="email"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="patient-phone">
                Phone
              </label>
              <input
                id="patient-phone"
                name="phone"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save Patient"}
          </button>
        </form>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">All Patients</h2>
          <ul className="mt-3 space-y-2">
            {loading && (
              <li className="text-sm text-slate-500">Loading patients...</li>
            )}
            {items.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-900">{p.name}</span>
                <span className="text-slate-600">{p.phone || "—"}</span>
                <span className="text-slate-500">{p.email || "—"}</span>
              </li>
            ))}
            {!loading && !items.length && (
              <li className="text-sm text-slate-500">No patients yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
