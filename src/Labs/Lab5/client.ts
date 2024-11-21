import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

// Fetch welcome message
export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${REMOTE_SERVER}/lab5/welcome`);
  return response.data;
};

// Fetch assignment
const ASSIGNMENT_API = `${REMOTE_SERVER}/lab5/assignment`;
export const fetchAssignment = async () => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data;
};

// Update assignment title
export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

// Todos API endpoints
const TODOS_API = `${REMOTE_SERVER}/lab5/todos`;

// Fetch todos
export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return Array.isArray(response.data) ? response.data : [];
};

// Create a new todo (old implementation)
export const createTodo = async () => {
  try {
    const response = await axios.get(`${TODOS_API}/create`);
    if (!Array.isArray(response.data)) {
      console.error("API did not return an array:", response.data);
      throw new Error("API did not return an array");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    return [];
  }
};

// Create a new todo using POST
export const postTodo = async (todo: any) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

// Remove a todo (old implementation)
export const removeTodo = async (todo: any) => {
  try {
    const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error removing todo:", error);
    return [];
  }
};

// Remove a todo using DELETE
export const deleteTodo = async (todo: any) => {
  try {
    await axios.delete(`${TODOS_API}/${todo.id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

// Update a todo using PUT
export const updateTodo = async (todo: any) => {
  try {
    await axios.put(`${TODOS_API}/${todo.id}`, todo);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
