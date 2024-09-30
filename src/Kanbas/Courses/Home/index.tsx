import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      {/* Left column: Modules */}
      <div className="flex-fill">
        <Modules />
      </div>
      {/* Right column: Course Status */}
      <div className="d-none d-md-block">
        <CourseStatus />
      </div>
    </div>
  );
}
