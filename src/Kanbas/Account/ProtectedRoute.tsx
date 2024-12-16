// src/Kanbas/Account/ProtectedRoute.tsx
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();

  // Check if the student is enrolled in the requested course
  const isEnrolledInCourse = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  if (currentUser.role === "STUDENT" && cid && !isEnrolledInCourse) {
    return <Navigate to="/Kanbas/Dashboard" />; // Redirect if not enrolled
  }

  return children;
}
