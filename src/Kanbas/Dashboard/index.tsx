import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="container-fluid">
      {/* Dashboard Title */}
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />
      {/* Published Courses Subtitle */}
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> 
      <hr />
      
      {/* Responsive Bootstrap Grid for Courses */}
      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        
        {/* Course 1 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
              <img src="/images/RJS.jpg" className="card-img-top" alt="React JS Course" />
              <div className="card-body">
                <h5 className="card-title">CS1234 React JS</h5>
                <p className="card-text">Full Stack Software Development</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

        {/* Course 2 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1235/Home">
              <img src="/images/JS.jpg" className="card-img-top" alt="JavaScript Course" />
              <div className="card-body">
                <h5 className="card-title">CS1235 JavaScript</h5>
                <p className="card-text">Frontend Development</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

        {/* Course 3 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1236/Home">
              <img src="/images/PY.jpeg" className="card-img-top" alt="Python Course" />
              <div className="card-body">
                <h5 className="card-title">CS1236 Python</h5>
                <p className="card-text">Backend Development</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

        {/* Course 4 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1237/Home">
              <img src="/images/DBMS.jpeg" className="card-img-top" alt="Database Management Course" />
              <div className="card-body">
                <h5 className="card-title">CS1237 Database Management</h5>
                <p className="card-text">Database Systems</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

        {/* Course 5 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1238/Home">
              <img src="/images/CC.jpeg" className="card-img-top" alt="Cloud Computing Course" />
              <div className="card-body">
                <h5 className="card-title">CS1238 Cloud Computing</h5>
                <p className="card-text">Cloud Architecture</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

        {/* Course 6 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1239/Home">
              <img src="/images/ML.jpeg" className="card-img-top" alt="Machine Learning Course" />
              <div className="card-body">
                <h5 className="card-title">CS1239 Machine Learning</h5>
                <p className="card-text">Artificial Intelligence and ML</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

        {/* Course 7 */}
        <div className="col">
          <div className="card h-100">
            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1240/Home">
              <img src="/images/CYS.jpg" className="card-img-top" alt="Cybersecurity Course" />
              <div className="card-body">
                <h5 className="card-title">CS1240 Cybersecurity</h5>
                <p className="card-text">Network Security</p>
                <button className="btn btn-primary">Go</button>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
