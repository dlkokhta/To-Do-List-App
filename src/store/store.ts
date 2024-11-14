import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../store/tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
