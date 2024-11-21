import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  useEffect(() => {
    const fetchAssignment = async () => {
      const assignment = await client.fetchAssignment();
      setAssignment(assignment);
    };
    fetchAssignment();
  }, []);

  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <input
        defaultValue={assignment.title}
        className="form-control mb-2"
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
