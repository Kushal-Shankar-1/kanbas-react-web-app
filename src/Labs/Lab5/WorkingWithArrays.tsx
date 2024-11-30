import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "New Title",
    description: "Updated Description",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* Retrieving all todos */}
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      {/* Retrieving todo by ID */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <input
        id="wd-todo-id"
        defaultValue={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      {/* Filtering todos by completion */}
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      {/* Creating a new todo */}
      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      {/* Deleting a todo */}
      <h4>Deleting from an Array</h4>
      <a
        id="wd-delete-todo"
        className="btn btn-primary"
        href={`${API}/${todo.id}/delete`}
      >
        Delete Todo with ID = {todo.id}
      </a>
      <input
        id="wd-todo-delete-id"
        defaultValue={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      {/* Updating a todo's title */}
<h4>Updating an Item in an Array</h4>
<a
  id="wd-update-todo-title"
  className="btn btn-primary float-end"
  href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
>
  Update Todo Title
</a>
<div className="d-flex">
  <input
    id="wd-todo-id"
    defaultValue={todo.id}
    className="form-control w-25 me-2"
    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
    placeholder="Enter Todo ID"
  />
  <input
    id="wd-todo-title"
    defaultValue={todo.title}
    className="form-control w-50"
    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
    placeholder="Enter New Title"
  />
</div>
<hr />

      {/* Updating a todo's completed property */}
<h4>Updating Completed Property</h4>
<div className="d-flex align-items-center mb-3">
  <input
    id="wd-todo-id"
    type="number"
    className="form-control w-25 me-2"
    value={todo.id}
    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
    placeholder="Enter Todo ID"
  />
  <label className="me-2">
    <input
      type="checkbox"
      className="form-check-input"
      checked={todo.completed}
      onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
    />
    Completed
  </label>
  <a
    id="wd-update-todo-completed"
    className="btn btn-primary"
    href={`${API}/${todo.id}/completed/${todo.completed}`}
  >
    Update Completed
  </a>
</div>
<hr />

      {/* Updating a todo's description */}
<h4>Updating Description</h4>
<div className="d-flex align-items-center mb-3">
  <input
    id="wd-todo-id"
    type="number"
    className="form-control w-25 me-2"
    value={todo.id}
    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
    placeholder="Enter Todo ID"
  />
  <input
    id="wd-todo-description"
    className="form-control w-50 me-2"
    value={todo.description}
    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
    placeholder="Enter New Description"
  />
  <a
    id="wd-update-todo-description"
    className="btn btn-primary"
    href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
  >
    Update Description
  </a>
</div>
<hr />
    </div>
  );
}
