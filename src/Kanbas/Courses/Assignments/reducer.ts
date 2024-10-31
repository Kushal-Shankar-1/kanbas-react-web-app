// src/Kanbas/Courses/Assignments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database";

export type Assignment = {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
  availableUntil: string;
  course: string;
};

const initialState = {
  assignments: dbAssignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
