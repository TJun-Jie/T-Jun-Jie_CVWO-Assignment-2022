import { combineReducers } from "redux";
import taskSlice from "./slices/taskSlice";
export default combineReducers({
  allTasks: taskSlice,
});
