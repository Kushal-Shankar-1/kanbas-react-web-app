import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

// Define Course type for type safety
interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image: string;
  author?: string;
}

export default function Courses() {
  const { cid } = useParams<{ cid: string }>(); // Retrieve course ID from URL
  const course = courses.find((c) => c._id === cid) as Course | undefined; // Find matching course
  const { pathname } = useLocation(); // Get the current path

  // Extract the current section from the URL (e.g., "Home", "Modules", etc.)
  const currentSection = pathname.split("/")[4] || "Home";

  if (!course) {
    // Handle case when course is not found
    return <h2 className="text-danger">Course Not Found</h2>;
  }

  return (
    <div id="wd-courses">
      {/* Breadcrumb Section */}
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course.name} &gt; {currentSection}
      </h2>
      <hr />

      <div className="d-flex">
        {/* Left column: Courses Navigation Sidebar */}
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>

        {/* Right column: Main content with Routes */}
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home course={course} />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}