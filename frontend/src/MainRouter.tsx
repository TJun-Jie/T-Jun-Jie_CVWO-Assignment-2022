import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompletedTaskPage from "./pages/CompletedTaskPage";
import LowPriority from "./pages/labels/LowPriority";
import MediumPriority from "./pages/labels/MediumPriority";
import HighPriority from "./pages/labels/HighPriority";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/completed" element={<CompletedTaskPage />} />
      <Route path="/low-priority" element={<LowPriority />} />
      <Route path="/medium-priority" element={<MediumPriority />} />
      <Route path="/high-priority" element={<HighPriority />} />
    </Routes>
  );
};

export default MainRouter;
