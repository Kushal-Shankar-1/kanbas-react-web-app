import Modules from "../Modules";
import CourseStatus from "./Status";
import { Course } from "../../Database"; // Import Course type

interface HomeProps {
  course: Course; // Explicitly declare prop type
}

export default function Home({ course }: HomeProps) {
  return (
    <div id="wd-home" className="d-flex">
      {/* Left column: Modules */}
      <div className="flex-fill">
        <h3>Welcome to {course.name}</h3>
        <p>{course.description}</p>
        <p>
          Start Date: {course.startDate} | End Date: {course.endDate}
        </p>
        <p>Credits: {course.credits}</p>
        <Modules />
      </div>

      {/* Right column: Course Status */}
      <div className="d-none d-md-block">
        <CourseStatus />
      </div>
    </div>
  );
}
