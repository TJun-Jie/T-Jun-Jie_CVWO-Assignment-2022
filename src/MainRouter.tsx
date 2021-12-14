import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CompletedTaskPage from "./pages/CompletedTaskPage";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/completed" element={<CompletedTaskPage/>}/>
        </Routes>
    )
}

export default MainRouter;