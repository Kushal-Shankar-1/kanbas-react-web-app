import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home">
            <img src="/images/RJS.jpg" width={200} alt="React JS Course" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack Software Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1235/Home">
            <img src="/images/JS.jpg" width={200} alt="JavaScript Course" />
            <div>
              <h5>CS1235 JavaScript</h5>
              <p className="wd-dashboard-course-title">Frontend Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1236/Home">
            <img src="/images/PY.jpeg" width={200} alt="Python Course" />
            <div>
              <h5>CS1236 Python</h5>
              <p className="wd-dashboard-course-title">Backend Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1237/Home">
            <img src="/images/DBMS.jpeg" width={200} alt="Database Management Course" />
            <div>
              <h5>CS1237 Database Management</h5>
              <p className="wd-dashboard-course-title">Database Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1238/Home">
            <img src="/images/CC.jpeg" width={200} alt="Cloud Computing Course" />
            <div>
              <h5>CS1238 Cloud Computing</h5>
              <p className="wd-dashboard-course-title">Cloud Architecture</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1239/Home">
            <img src="/images/ML.jpeg" width={200} alt="Machine Learning Course" />
            <div>
              <h5>CS1239 Machine Learning</h5>
              <p className="wd-dashboard-course-title">Artificial Intelligence and ML</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1240/Home">
            <img src="/images/CYS.jpg" width={200} alt="Cybersecurity Course" />
            <div>
              <h5>CS1240 Cybersecurity</h5>
              <p className="wd-dashboard-course-title">Network Security</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}