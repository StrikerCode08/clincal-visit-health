import { useMemo, useState } from "react";
import { GlobalErrorContext } from "./GlobalErrorContext.js";

export default function GlobalErrorProvider({ children }) {
  const [globalError, setGlobalError] = useState("");

  const value = useMemo(
    () => ({
      globalError,
      setGlobalError,
      clearGlobalError: () => setGlobalError("")
    }),
    [globalError]
  );

  return (
    <GlobalErrorContext.Provider value={value}>
      {children}
    </GlobalErrorContext.Provider>
  );
}
