import { useParams } from "react-router-dom";

export default function AssignmentEditor() {
  const { aid } = useParams<{ aid: string }>();

  return (
    <div id="wd-assignments-editor">
      <h2>Assignment Editor - {aid}</h2>
      
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br /><br />
      
      {/* Description */}
      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea id="wd-description" rows={5} cols={50}>
        The assignment is available online. Submit a link to the landing page of your project.
      </textarea>
      <br />
      
      {/* Form Table */}
      <table>
        <tbody>
          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" value={100} />
            </td>
          </tr>
          
          {/* Assignment Group */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignments">Assignments</option>
                <option value="quizzes">Quizzes</option>
                <option value="exams">Exams</option>
                <option value="projects">Projects</option>
              </select>
            </td>
          </tr>
          
          {/* Display Grade as */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="points">Points</option>
                <option value="percentage">Percentage</option>
                <option value="letter-grade">Letter Grade</option>
              </select>
            </td>
          </tr>
          
          {/* Submission Type */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="on-paper">On Paper</option>
                <option value="external-tool">External Tool</option>
              </select>
            </td>
          </tr>
          
          {/* Online Entry Options */}
          <tr>
            <td align="right" valign="top">
              Online Entry Options
            </td>
            <td>
              <input type="checkbox" id="wd-text-entry" />{' '}
              <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" />{' '}
              <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" />{' '}
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-student-annotation" />{' '}
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />
              <input type="checkbox" id="wd-file-upload" />{' '}
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
          
          {/* Assign To */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" value="Everyone" />
            </td>
          </tr>
          
          {/* Due Date */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" value="2023-12-31" />
            </td>
          </tr>
          
          {/* Available From */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" value="2023-11-01" />
            </td>
          </tr>
          
          {/* Available Until */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Available Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" value="2024-01-31" />
            </td>
          </tr>
        </tbody>
      </table>
      
      {/* Save and Cancel Buttons */}
      <br />
      <button>Save</button> <button>Cancel</button>
    </div>
  );
}