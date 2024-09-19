import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <table id="wd-home">
      <tbody>
        <tr>
          {/* Left column: Modules */}
          <td valign="top">
            <Modules />
          </td>
          {/* Right column: Course Status */}
          <td valign="top">
            <CourseStatus />
          </td>
        </tr>
      </tbody>
    </table>
  );
}