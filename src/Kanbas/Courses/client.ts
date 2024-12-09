// src/Kanbas/Courses/client.ts

import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

/**
 * Fetches all courses from the server.
 * @returns {Promise<any[]>} A promise that resolves to an array of courses.
 */
export const fetchAllCourses = async (): Promise<any[]> => {
  try {
    const { data } = await axios.get(COURSES_API);
    return data;
  } catch (error) {
    console.error("Error fetching all courses:", error);
    throw error;
  }
};

/**
 * Creates a new course on the server.
 * @param {any} course - The course object to create.
 * @returns {Promise<any>} A promise that resolves to the created course.
 */
export const createCourse = async (course: any): Promise<any> => {
  try {
    const { data } = await axios.post(COURSES_API, course);
    return data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

/**
 * Updates an existing course on the server.
 * @param {string} courseId - The ID of the course to update.
 * @param {any} course - The updated course object.
 * @returns {Promise<any>} A promise that resolves to the updated course.
 */
export const updateCourse = async (courseId: string, course: any): Promise<any> => {
  try {
    const { data } = await axios.put(`${COURSES_API}/${courseId}`, course);
    return data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

/**
 * Deletes a course from the server.
 * @param {string} courseId - The ID of the course to delete.
 * @returns {Promise<void>} A promise that resolves when the course is deleted.
 */
export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    await axios.delete(`${COURSES_API}/${courseId}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

/**
 * Fetches modules for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<any[]>} A promise that resolves to an array of modules.
 */
export const findModulesForCourse = async (courseId: string): Promise<any[]> => {
  try {
    console.log(`Making API call to: ${COURSES_API}/${courseId}/modules`); // Log endpoint
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    console.log(`Modules retrieved from API:`, response.data); // Log response
    return response.data;
  } catch (error) {
    console.error(`Error fetching modules for course ${courseId}:`, error);
    throw error;
  }
};

/**
 * Creates a new module for a specific course.
 * @param {string} courseId - The ID of the course.
 * @param {Object} module - The module object to create.
 * @returns {Promise<any>} A promise that resolves to the created module.
 */
export const createModuleForCourse = async (courseId: string, module: any): Promise<any> => {
  try {
    const response = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
    return response.data;
  } catch (error) {
    console.error(`Error creating module for course ${courseId}:`, error);
    throw error;
  }
};

export const findUsersForCourse = async (courseId: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching users for course:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "Failed to fetch users for course.");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};
