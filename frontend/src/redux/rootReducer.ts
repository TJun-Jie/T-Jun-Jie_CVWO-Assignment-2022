import {combineReducers} from "redux";
import taskSlice from "./slices/taskSlice";
import authSlice from "./slices/authSlice";

export default combineReducers({
    allTasks: taskSlice,
    auth: authSlice,
});
