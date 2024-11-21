import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

/**
 * Deletes a module by its ID.
 * @param {string} moduleId - The ID of the module to delete.
 * @returns {Promise<void>} Resolves when the module is deleted.
 */
export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    await axios.delete(`${MODULES_API}/${moduleId}`);
  } catch (error) {
    console.error(`Error deleting module with ID ${moduleId}:`, error);
    throw error;
  }
};

/**
 * Updates a module on the server.
 * @param {Object} module - The module object with updates.
 * @returns {Promise<any>} A promise that resolves when the module is updated.
 */
export const updateModule = async (module: any): Promise<void> => {
    try {
      await axios.put(`${MODULES_API}/${module._id}`, module);
    } catch (error) {
      console.error(`Error updating module ${module._id}:`, error);
      throw error;
    }
  };