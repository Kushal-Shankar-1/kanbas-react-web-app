import axios from "axios";
import { CourseType } from "../Courses/types";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000" || "https://kanbas-node-server-app-emvj.onrender.com";
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

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

/**
 * Enroll a user in a course.
 * @param {Object} enrollment - The enrollment object containing userId and courseId.
 * @returns {Promise<Object>} The created enrollment.
 */
export const enrollUser = async (data: { courseId: string; userId: string }) => {
  console.log("Payload sent to enrollUser:", data); // Debugging
  const response = await axios.post(`${ENROLLMENTS_API}`, data);
  return response.data;
};

/**
 * Unenroll a user from a course.
 * @param {Object} unenrollment - The unenrollment object containing userId and courseId.
 * @returns {Promise<Object>} The removed enrollment.
 */
export const unenrollUser = async (unenrollment: { userId: string; courseId: string }) => {
  const response = await axios.delete(ENROLLMENTS_API, { data: unenrollment });
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

/**
 * Fetches users filtered by role.
 * @param {String} role - The role to filter users by.
 * @returns {Promise} - The filtered users.
 */
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  console.log("API Response for Role:", response.data); // Debugging
  return response.data;
};


/**
 * Fetches users filtered by partial name match.
 * @param {String} name - The partial name to filter users by.
 * @returns {Promise} - The filtered users.
 */
export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

/**
 * Fetch a user by ID.
 * @param {string} id - The user ID to retrieve.
 * @returns {Promise<any>} - The user data.
 */
export const findUserById = async (id: string) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching user by ID:", error.response?.data || error.message);
      throw error;
    } else {
      console.error("Unexpected error fetching user by ID:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

/**
 * Deletes a user by their ID.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<any>} - The server's response.
 */
export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    throw new Error("Failed to delete user.");
  }
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user); // API call
  return response.data; // Return the created user
};
