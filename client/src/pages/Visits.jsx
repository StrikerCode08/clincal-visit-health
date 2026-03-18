import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../lib/api.js";
import useGlobalError from "../context/useGlobalError.js";
import getErrorMessage from "../lib/errorMessage.js";

export default function Visits() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalError, clearGlobalError } = useGlobalError();

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/visits");
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
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Visits</h1>
          <Link to="/" className="text-sm text-slate-600">
            Home
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">All Visits</h2>
          <ul className="mt-3 space-y-2">
            {loading && (
              <li className="text-sm text-slate-500">Loading visits...</li>
            )}
            {items.map((v) => (
              <li
                key={v.id}
                className="rounded-md border border-slate-100 px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">
                    {v.patient?.name} with {v.clinician?.name}
                  </span>
                  <span className="text-slate-500">
                    {new Date(v.visitedAt).toLocaleString()}
                  </span>
                </div>
                {v.notes && <p className="mt-1 text-slate-600">{v.notes}</p>}
              </li>
            ))}
            {!loading && !items.length && (
              <li className="text-sm text-slate-500">No visits yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
