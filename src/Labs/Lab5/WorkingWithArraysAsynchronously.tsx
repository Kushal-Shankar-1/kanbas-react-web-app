import React, { useState, useEffect } from "react";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await client.fetchTodos();
        setTodos(todos);
      } catch (error) {
        setErrorMessage("Error fetching todos");
      }
    };
    fetchTodos();
  }, []);

  // Create a new todo
  const postTodo = async () => {
    const newTaskNumber = todos.length + 1; // Generate a unique task number
    const title = `Task ${newTaskNumber}`; // Assign a unique title
    try {
      const newTodo = await client.postTodo({
        title: title,
        completed: false,
      });
      setTodos([...todos, newTodo]);
    } catch (error) {
      setErrorMessage("Error creating new todo");
    }
  };

  // Delete a todo
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      setErrorMessage("Error deleting todo");
    }
  };

  // Update todo completion status
  const toggleCompletion = async (todo: any) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await client.updateTodo(updatedTodo);
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      setErrorMessage("Error updating todo");
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div className="alert alert-danger mb-2">{errorMessage}</div>
      )}
      <h4>
        Todos
        <FaPlusCircle
          onClick={postTodo}
          className="text-success float-end fs-3"
          id="wd-post-todo"
        />
      </h4>
      <ul className="list-group">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="list-group-item">
              <FaTrash
                onClick={() => deleteTodo(todo)}
                className="text-danger float-end mt-1"
                id="wd-delete-todo"
              />
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title || "Untitled Todo"} {/* Fallback for missing title */}
              </span>
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No todos available</li>
        )}
      </ul>
      <hr />
    </div>
  );
}
