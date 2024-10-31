import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../Database";

interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface ModuleState {
  _id: string;
  name: string;
  course: string;
  description: string;
  lessons: Lesson[]; // Ensures lessons is always an array
  editing?: boolean;
}

interface ModulesState {
  modules: ModuleState[];
}

const initialState: ModulesState = {
  modules: initialModules.map((module) => ({
    ...module,
    lessons: module.lessons || [], // Ensures lessons is an array if undefined
  })) as ModuleState[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<{ name: string; course: string }>) => {
      const newModule: ModuleState = {
        _id: new Date().getTime().toString(),
        name: action.payload.name,
        course: action.payload.course,
        description: "New module description",
        lessons: [],
      };
      state.modules.push(newModule);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
    updateModule: (state, action: PayloadAction<ModuleState>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? { ...action.payload, editing: false } : m
      );
    },
  },
});

export const { addModule, deleteModule, editModule, updateModule } = modulesSlice.actions;
export default modulesSlice.reducer;