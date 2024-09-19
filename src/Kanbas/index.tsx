// src/Kanbas/index.tsx
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";

export default function Kanbas() {
  return (
    <div id="wd-kanbas">
      <table>
        <tbody>
          <tr>
            {/* Left column: Kanbas Navigation Sidebar */}
            <td valign="top">
              <KanbasNavigation />
            </td>
            {/* Right column: Routes */}
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                {/* Courses route */}
                <Route path="/Courses/:cid/*" element={<Courses />} />
                {/* Additional placeholder routes */}
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}