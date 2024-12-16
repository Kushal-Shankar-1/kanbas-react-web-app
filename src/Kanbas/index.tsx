// src/Kanbas/index.tsx

import { Provider } from "react-redux";
import store from "./store";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { CourseType } from "./Courses/types";
import "./styles.css";

export default function Kanbas() {
  const [allCourses, setAllCourses] = useState<any[]>([]); // State for all courses
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]); // State for enrolled courses
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.png",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  /**
   * Fetches all available courses from the server.
   */
  const fetchAllCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  /**
   * Fetches the current user's enrolled courses from the server.
   */
  const fetchEnrolledCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  /**
   * Fetch both all courses and enrolled courses when the user is logged in.
   */
  useEffect(() => {
    if (currentUser) {
      fetchAllCourses();
      fetchEnrolledCourses();
    } else {
      setAllCourses([]); // Clear all courses if no user is logged in
      setEnrolledCourses([]); // Clear enrolled courses
    }
  }, [currentUser]);

  /**
   * Functions to handle CRUD operations via the server.
   */

  const addNewCourse = async () => {
    try {
      const newCourseData = {
        ...course,
        _id: "", // Let the server assign the ID
      };
  
      // Create the course on the server
      const newCourse = await userClient.createCourse(newCourseData);
  
      // Append the new course to allCourses
      setAllCourses((prevCourses) => [...prevCourses, newCourse]);
  
      // Optionally refresh enrolledCourses if current user is auto-enrolled
      await fetchEnrolledCourses();
  
      // Reset the course form after creation
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.png",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const updateCourseHandler = async () => {
    try {
      // Update the course on the server
      await courseClient.updateCourse(course._id, course);
  
      // Fetch the updated list of all courses
      const updatedAllCourses = await courseClient.fetchAllCourses();
      setAllCourses(updatedAllCourses);
  
      // Fetch the updated enrolled courses for the current user
      const updatedEnrolledCourses = await userClient.findMyCourses();
      setEnrolledCourses(updatedEnrolledCourses);
  
      // Reset the course form
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.png",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  
  const deleteCourseHandler = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId); // Use courseClient
      setAllCourses((prevCourses) => prevCourses.filter((c) => c._id !== courseId));
      setEnrolledCourses((prevEnrolled) => prevEnrolled.filter((c) => c._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
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
                    allCourses={allCourses} // Pass allCourses
                    enrolledCourses={enrolledCourses} // Pass enrolledCourses
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourseHandler}
                    updateCourse={updateCourseHandler}
                    setEnrolledCourses={setEnrolledCourses}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={allCourses} />
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
