// src/Kanbas/index.tsx
import { Provider } from "react-redux";
import store from "./store";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as db from "./Database";
import { useState } from "react";
import "./styles.css";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.png",
    description: "New Description",
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: new Date().getTime().toString() };
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.png",
      description: "New Description",
    }); // Reset course state after adding
  };

  const updateCourse = () => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => (c._id === course._id ? course : c))
    );
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.png",
      description: "New Description",
    }); // Reset course state after updating
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prevCourses) => prevCourses.filter((c) => c._id !== courseId));
  };

  return (
    <Provider store={store}>
      <div id="wd-kanbas" className="d-flex">
        <div className="d-none d-md-block">
          <KanbasNavigation />
        </div>
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
