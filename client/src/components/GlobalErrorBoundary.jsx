import ErrorBoundary from "./ErrorBoundary.jsx";
import useGlobalError from "../context/useGlobalError.js";

export default function GlobalErrorBoundary({ children }) {
  const { setGlobalError } = useGlobalError();

  return (
    <ErrorBoundary
      onError={() => setGlobalError("Unexpected error. Please try again.")}
    >
      {children}
    </ErrorBoundary>
  );
}
