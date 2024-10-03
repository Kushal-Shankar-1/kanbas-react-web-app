import React from 'react';
import { useParams } from 'react-router-dom';

export default function AssignmentEditor() {
  const { aid } = useParams<{ aid: string }>();

  return (
    <div id="wd-assignments-editor" className="container my-4 p-4">
      <h2 className="mb-4">Assignment - {aid}</h2>

      <div className="row">
        <div className="col-lg-8">
          {/* Assignment Name */}
          <div className="mb-3">
            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" className="form-control" />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="wd-description" className="form-label">Description</label>
            <textarea
              id="wd-description"
              rows={4}
              className="form-control"
              defaultValue="The assignment is available online. Submit a link to the landing page of your project."
            />
          </div>

          {/* Points */}
          <div className="mb-3">
            <label htmlFor="wd-points" className="form-label">Points</label>
            <input id="wd-points" type="number" defaultValue={100} className="form-control" />
          </div>

          {/* Assignment Group */}
          <div className="mb-3">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
            <select id="wd-group" className="form-control" defaultValue="assignments">
              <option value="assignments">Assignments</option>
              <option value="quizzes">Quizzes</option>
              <option value="exams">Exams</option>
              <option value="projects">Projects</option>
            </select>
          </div>

          {/* Display Grade as */}
          <div className="mb-3">
            <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
            <select id="wd-display-grade-as" className="form-control" defaultValue="Percentage">
              <option value="Points">Points</option>
              <option value="Percentage">Percentage</option>
              <option value="Letter Grade">Letter Grade</option>
            </select>
          </div>

          {/* Submission Type */}
          <div className="mb-3">
            <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
            <select id="wd-submission-type" className="form-control" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
              <option value="Reference Link">Reference Link</option>
            </select>
          </div>

          {/* Online Entry Options */}
          <div className="mb-3">
            <label className="form-label">Online Entry Options</label>
            <div className="form-check">
              <input type="checkbox" id="wd-text-entry" className="form-check-input" />
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-website-url" className="form-check-input" />
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-file-upload" className="form-check-input" />
              <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
            </div>
          </div>

          {/* Assign To */}
          <div className="mb-3">
            <label htmlFor="wd-assign-to" className="form-label">Assign To</label>
            <input id="wd-assign-to" defaultValue="Everyone" className="form-control" />
          </div>

          {/* Due Date */}
          <div className="mb-3">
            <label htmlFor="wd-due-date" className="form-label">Due Date</label>
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" className="form-control" />
          </div>

          {/* Available From */}
          <div className="mb-3">
            <label htmlFor="wd-available-from" className="form-label">Available From</label>
            <input id="wd-available-from" type="date" defaultValue="2024-08-08" className="form-control" />
          </div>

          {/* Available Until */}
          <div className="mb-3">
            <label htmlFor="wd-available-until" className="form-label">Available Until</label>
            <input id="wd-available-until" type="date" defaultValue="2024-11-08" className="form-control" />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-secondary me-2">Cancel</button>
            <button className="btn btn-danger">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}