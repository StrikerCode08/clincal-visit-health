import { Link } from "react-router-dom";

const cards = [
  { title: "Clinicians", desc: "Manage clinicians", to: "/clinicians" },
  { title: "Patients", desc: "View patients", to: "/patients" },
  { title: "Visits", desc: "All visits", to: "/visits" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-slate-900">
          Patient Visit Tracker
        </h1>
        <p className="mt-2 text-slate-600">
          Track clinician visits, patients, and visit history.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {card.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/visits/new"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Create New Visit
          </Link>
          <Link
            to="/visits/history"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800"
          >
            Previous Visits
          </Link>
        </div>
      </div>
    </div>
  );
}
