// src/Kanbas/Courses/client.ts
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
};

export const updateCourse = async (course: any) => {
  await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
};
