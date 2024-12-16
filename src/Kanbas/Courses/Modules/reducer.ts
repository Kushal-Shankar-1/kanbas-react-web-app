import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  modules: [], // Initialize as an empty array; data will come from the server
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    /**
     * Sets the modules for the current course.
     * This action is typically dispatched after fetching modules from the server.
     */
    setModules: (state, action: PayloadAction<ModuleState[]>) => {
      state.modules = action.payload;
    },

    /**
     * Adds a new module to the state.
     * This action is dispatched after creating a module on the server.
     */
    addModule: (state, action: PayloadAction<ModuleState>) => {
      state.modules.push(action.payload);
    },

    /**
     * Deletes a module from the state by its ID.
     * This action assumes the module has already been deleted on the server.
     */
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    /**
     * Marks a module as being edited by toggling its `editing` property.
     */
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },

    /**
     * Updates a module's data in the state, and stops the editing mode.
     */
    updateModule: (state, action: PayloadAction<ModuleState>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? { ...action.payload, editing: false } : m
      );
    },
  },
});

export const { setModules, addModule, deleteModule, editModule, updateModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
