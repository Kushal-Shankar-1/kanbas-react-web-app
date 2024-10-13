import { Link } from "react-router-dom";
import * as db from "../Database"; // Importing courses from the Database folder

export default function Dashboard() {
  const courses = db.courses; // Load courses data from courses.json

  return (
    <div id="wd-dashboard" className="container-fluid p-4">
      {/* Dashboard Title */}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Published Courses Subtitle */}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      {/* Responsive Bootstrap Grid for Courses */}
      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {courses.map((course) => (
          <div key={course._id} className="col">
            <div className="card h-100">
              <Link
                to={`/Kanbas/Courses/${course._id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={`${course.name} Course`}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}