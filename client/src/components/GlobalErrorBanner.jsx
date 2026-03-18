import useGlobalError from "../context/useGlobalError.js";

export default function GlobalErrorBanner() {
  const { globalError, clearGlobalError } = useGlobalError();

  if (!globalError) {
    return null;
  }

  return (
    <div className="bg-red-50 border-b border-red-200 px-6 py-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <p className="text-sm text-red-700">{globalError}</p>
        <button
          type="button"
          onClick={clearGlobalError}
          className="text-sm font-medium text-red-700 hover:text-red-800"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
