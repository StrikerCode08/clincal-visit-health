import { useContext } from "react";
import { GlobalErrorContext } from "./GlobalErrorContext.js";

export default function useGlobalError() {
  const ctx = useContext(GlobalErrorContext);
  if (!ctx) {
    throw new Error("useGlobalError must be used within GlobalErrorProvider");
  }
  return ctx;
}
