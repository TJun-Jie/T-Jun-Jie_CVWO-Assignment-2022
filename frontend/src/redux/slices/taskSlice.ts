import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../shared/types/task";
import type { RootState } from "../store";

// Define a type for the slice state
interface TaskState {
  tasks: Task[];
}

// Define the initial state using that type
const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state.allTasks.tasks;

export default taskSlice.reducer;
