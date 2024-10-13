import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

export type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  image?: string;
  description: string;
};

export type Module = {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
};

export type Lesson = {
  _id: string;
  name: string;
  description: string;
  module: string;
};

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

export type User = {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
};

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

export { courses, modules, assignments, users, enrollments };