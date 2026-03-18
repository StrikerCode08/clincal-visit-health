import { Link } from "react-router-dom";

export default function Visits() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Visits</h1>
          <Link to="/" className="text-sm text-slate-600">Home</Link>
        </div>
        <p className="mt-2 text-slate-600">All visits will appear here.</p>
      </div>
    </div>
  );
}
