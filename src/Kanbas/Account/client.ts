import axios from "axios";
import { CourseType } from "../Courses/types";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Existing functions
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

/**
 * Fetches the current user's enrolled courses from the server.
 * @returns {Promise<any[]>} A promise that resolves to an array of courses.
 */
export const findMyCourses = async (): Promise<any[]> => {
  try {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
  } catch (error) {
    console.error("Error fetching my courses:", error);
    throw error;
  }
};

/**
 * Creates a new course on the server and returns the new course object.
 * @param {Object} course - The course data to create.
 * @returns {Promise<Object>} The newly created course.
 */
export const createCourse = async (course: any): Promise<any> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return response.data;
};

/**
 * Deletes a course from the server by ID.
 * @param {string} id - The ID of the course to delete.
 * @returns {Promise<void>} A promise that resolves when the course is deleted.
 */
export const deleteCourse = async (id: string): Promise<void> => {
  await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
};

/**
 * Updates an existing course on the server.
 * @param {string} courseId - The ID of the course to update.
 * @param {Object} course - The updated course object.
 * @returns {Promise<Object>} A promise that resolves to the server's response.
 */
export const updateCourse = async (courseId: string, course: CourseType): Promise<CourseType> => {
  const { data } = await axios.put(`${COURSES_API}/${courseId}`, course);
  return data;
};

/**
 * Retrieves modules for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<Array>} A promise that resolves to an array of modules.
 */
export const findModulesForCourse = async (courseId: string): Promise<any[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};