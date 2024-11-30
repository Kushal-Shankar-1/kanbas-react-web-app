import React, { useState, useEffect } from "react";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6"; // Import pencil icon
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

  // Create a new todo using GET
  const createTodo = async () => {
    try {
      const todos = await client.createTodo();
      setTodos(todos);
    } catch (error) {
      setErrorMessage("Error creating todo");
    }
  };

  // Create a new todo using POST
  const postTodo = async () => {
    const newTaskNumber = todos.length + 1;
    const title = `Task ${newTaskNumber}`;
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

  // Delete a todo using DELETE
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      setErrorMessage("Error deleting todo");
    }
  };

  // Delete a todo using GET (old implementation)
  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
    } catch (error) {
      setErrorMessage("Error removing todo");
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

  // Enable editing mode for a todo
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  // Update the title of a todo
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
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
          onClick={createTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>
      <ul className="list-group">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="list-group-item">
              {/* Pencil icon for editing */}
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary float-end me-2 mt-1"
                id="wd-edit-todo"
              />
              {/* Trash icon for old delete */}
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger float-end mt-1"
                id="wd-remove-todo"
              />
              {/* Delete icon for new implementation */}
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger float-end me-2 fs-3"
                id="wd-delete-todo"
              />
              {/* Checkbox for completion */}
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo)}
              />
              {/* Editable title */}
              {!todo.editing ? (
                <span>{todo.title || "Untitled Todo"}</span>
              ) : (
                <input
                  className="form-control w-50 float-start"
                  defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({ ...todo, title: e.target.value })
                  }
                />
              )}
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
