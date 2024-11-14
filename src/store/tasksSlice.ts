import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksTypes } from "../types/tasksTypes";

const initialState: { tasks: tasksTypes[] } = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<tasksTypes[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
