import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Clinicians from "./pages/Clinicians.jsx";
import Home from "./pages/Home.jsx";
import NewVisit from "./pages/NewVisit.jsx";
import Patients from "./pages/Patients.jsx";
import VisitHistory from "./pages/VisitHistory.jsx";
import Visits from "./pages/Visits.jsx";
import GlobalErrorBanner from "./components/GlobalErrorBanner.jsx";

function App() {
  return (
    <>
      <GlobalErrorBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clinicians" element={<Clinicians />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/visits" element={<Visits />} />
        <Route path="/visits/new" element={<NewVisit />} />
        <Route path="/visits/history" element={<VisitHistory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
