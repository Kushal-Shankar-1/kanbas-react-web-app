import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { courses } from "./Database";
import "./styles.css";

export default function Kanbas() {
  // Log courses to verify the data import
  console.log("Courses from Database:", courses);

  return (
    <div id="wd-kanbas" className="d-flex">
      {/* Left column: Kanbas Navigation Sidebar */}
      <div className="d-none d-md-block">
        <KanbasNavigation />
      </div>

      {/* Right column: Main content with Routes */}
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}