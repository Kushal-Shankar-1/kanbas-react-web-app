import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

/**
 * Fetch assignments for a course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<any[]>} Array of assignments for the course.
 */
export const findAssignmentsForCourse = async (courseId: string): Promise<any[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

/**
 * Create a new assignment.
 * @param {string} courseId - The ID of the course.
 * @param {Object} assignment - Assignment details.
 * @returns {Promise<Object>} The created assignment.
 */
export const createAssignment = async (courseId: string, assignment: {
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
  }): Promise<any> => {
    try {
      const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
      return response.data;
    } catch (error) {
      console.error(`Error creating assignment for course ${courseId}:`, error);
      throw error;
    }
  };

/**
 * Update an assignment.
 * @param {any} assignment - Assignment details.
 * @returns {Promise<any>} The updated assignment.
 */
export const updateAssignment = async (assignment: any): Promise<any> => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

/**
 * Delete an assignment by ID.
 * @param {string} assignmentId - The ID of the assignment.
 * @returns {Promise<void>} Resolves when the assignment is deleted.
 */
export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
