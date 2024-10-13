import { NavLink, useLocation } from "react-router-dom";
import { useParams } from "react-router";

export default function CoursesNavigation() {
  const { cid } = useParams<{ cid: string }>(); // Retrieve the course ID
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((link) => (
        <NavLink
          key={link}
          to={`/Kanbas/Courses/${cid}/${link}`}
          className={({ isActive }) =>
            `list-group-item border-0 ${isActive ? 'active' : 'text-danger'}`
          }
        >
          {link}
        </NavLink>
      ))}
    </div>
  );
}