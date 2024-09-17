import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <img src="/images/course1.jpg" width={200} alt="Course 1" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
            <Link to="/Kanbas/Courses/1234/Home">Go</Link>
          </div>
        </div>
        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <img src="/images/course2.jpg" width={200} alt="Course 2" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/5678/Home">
              CS5678 Node JS
            </Link>
            <p className="wd-dashboard-course-title">Backend Development</p>
            <Link to="/Kanbas/Courses/5678/Home">Go</Link>
          </div>
        </div>
        {/* Add at least 7 courses in total */}
        {/* Course 3 */}
        {/* ... */}
      </div>
    </div>
  );
}