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
      <Route path="/priorities/1" element={<LowPriority />} />
      <Route path="/priorities/2" element={<MediumPriority />} />
      <Route path="/priorities/3" element={<HighPriority />} />
    </Routes>
  );
};

export default MainRouter;
