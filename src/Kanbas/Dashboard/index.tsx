// src/Kanbas/Dashboard/index.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleEnrollment } from "../Account/enrollmentsReducer";
import { enrollUser, unenrollUser } from "../Account/client";
import * as userClient from "../Account/client";


export default function Dashboard({
  allCourses,
  enrolledCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  setEnrolledCourses,
}: {
  allCourses: any[];
  enrolledCourses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  setEnrolledCourses: (courses: any[]) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollmentsFromStore = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  /**
   * Determines if the current user is enrolled in a specific course.
   * @param {string} courseId - The ID of the course.
   * @returns {boolean} True if enrolled, else false.
   */
  const isEnrolled = (courseId: string): boolean =>
    enrolledCourses.some((course) => course._id === courseId);

  /**
   * Conditionally display courses based on the toggle.
   */
  const displayedCourses = showAllCourses
    ? allCourses
    : enrolledCourses;

  /**
   * Handle Enroll/Unenroll button click.
   */
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleToggleEnrollment = async (courseId: string) => {
    try {
      if (isEnrolled(courseId)) {
        await unenrollUser({ courseId, userId: currentUser._id });
        dispatch(toggleEnrollment({ courseId, userId: currentUser._id }));
        setFeedbackMessage("Successfully unenrolled!");
      } else {
        await enrollUser({ courseId, userId: currentUser._id });
        dispatch(toggleEnrollment({ courseId, userId: currentUser._id }));
        setFeedbackMessage("Successfully enrolled!");
      }
  
      // Fetch updated enrolled courses after toggling enrollment
      const updatedEnrolledCourses = await userClient.findMyCourses();
      setEnrolledCourses(updatedEnrolledCourses); // Use the passed prop
    } catch (error) {
      console.error("Error toggling enrollment:", error);
      setFeedbackMessage("An error occurred.");
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            className="form-control mb-2"
            placeholder="Course Name"
          />
          <textarea
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            className="form-control"
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      {currentUser?.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {displayedCourses.map((course) => (
          <div key={course._id} className="col" style={{ width: "300px" }}>
            <div className="card">
              <Link
                to={`/Kanbas/Courses/${course._id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <img
                  src={course.image || "/images/reactjs.jpg"}
                  className="card-img-top"
                  alt={`${course.name} Course`}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                </div>
              </Link>
              {currentUser?.role === "STUDENT" && (
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className={`btn btn-${
                      isEnrolled(course._id) ? "danger" : "success"
                    } btn-sm`}
                    onClick={() => handleToggleEnrollment(course._id)}
                  >
                    {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                  </button>
                </div>
              )}
              {currentUser?.role === "FACULTY" && (
                <div className="card-footer d-flex justify-content-between">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    id="wd-edit-course-click"
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}
                    className="btn btn-danger btn-sm"
                    id="wd-delete-course-click"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
