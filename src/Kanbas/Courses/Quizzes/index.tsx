import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setQuizzes, updateQuiz, updateNewQuiz } from "./quizzesReducer";
import * as client from "./client";

export default function Quizzes() {
  const { cid } = useParams(); // Course ID
  const { quizzes, newQuiz } = useSelector(
    (state: any) => state.quizzesReducer
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const newQuizRef = useRef<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      const quizzesData = await client.findQuizzesForCourse(cid as string);
      console.log("Fetched quizzes:", quizzesData);
      dispatch(setQuizzes(quizzesData || []));
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      dispatch(setQuizzes([]));
    }
  };

  const saveQuiz = async (quiz: any) => {
    try {
      await client.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, dispatch]);

  useEffect(() => {
    if (
      newQuiz &&
      cid &&
      newQuiz.course !== cid &&
      newQuizRef.current !== newQuiz.id
    ) {
      const newQuizData = {
        ...newQuiz,
        course: cid,
        title: `Quiz ${quizzes.length}`,
      };

      newQuizRef.current = newQuiz.id;

      saveQuiz(newQuizData)
        .then(() => {
          dispatch(updateNewQuiz(newQuizData));
        })
        .catch((error) => console.error("Failed to save new quiz:", error));
    }
  }, [newQuiz, cid, quizzes.length, dispatch]);

  return (
    <div id="wd-quizzes" className="ms-1 me-1">
      <QuizzesControls qid={newQuiz?._id} cid={cid} />
      <ul id="wd-assignments" className="list-group rounded-0 ms-5 me-5">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignment Quizzes
          </div>

          {currentUser.role === "STUDENT" && quizzes.length === 0 && (
            <h3 className="ps-3 text-danger">
              No quizzes have been created for this course.
            </h3>
          )}

          {quizzes.length === 0 ? (
            <p className="ps-3 text-danger">
              No quizzes have been created for this course.
              {currentUser.role === "FACULTY" &&
                " Click the '+ Quiz' button to add a quiz."}
            </p>
          ) : (
            <ul className="wd-lessons list-group rounded-0">
              {quizzes
              // Filter out unpublished quizzes for students

              .filter((quiz: any) =>

                currentUser.role === "FACULTY" || quiz.status === "published"

              )
                .filter((quiz: any) => quiz.course === cid && quiz._id !== "new")
                .map((quiz: any) => (
                  <li
                    key={quiz._id}
                    className="wd-lesson list-group-item p-3 ps-1 border-left-success"
                  >
                    <div className="wd-flex-row-container">
                      <IoRocketOutline className="ms-3 mt-3 me-3 fs-2 text-success" />
                      <div className="wd-flex-grow-1">
                        <Link
                          to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                          className="text-black link-underline link-underline-opacity-0"
                        >
                          {quiz.title}
                        </Link>
                        <br />
                        <strong>
                          {new Date(quiz.availableUntil) < new Date() &&
                            "Closed"}
                        </strong>
                        <strong>
                          {new Date(quiz.availableFrom) <= new Date() &&
                            new Date() <= new Date(quiz.availableUntil) &&
                            "Available"}
                        </strong>
                        <strong>
                          {new Date(quiz.availableFrom) > new Date() &&
                            "Not Available Until"}
                        </strong>{" "}
                        {new Date(quiz.availableFrom) > new Date() &&
                          new Date(quiz.availableFrom).toDateString()} |{" "}
                        <strong> Due</strong> {new Date(quiz.due).toDateString()} | {" "}
                        {quiz.points ? quiz.points : 0} pts | {" "}
                        {quiz.questions?.length || 0} Questions {" "}
                        {currentUser.role === "STUDENT" && (
                          <>
                            | <strong>Last Score:</strong>{" "}
                            {currentUser.quizAttempts?.find(
                              (qa: any) =>
                                qa.course === quiz.course &&
                                qa.quiz === quiz._id
                            )?.grade || "NA"}
                          </>
                        )}
                      </div>
                      {currentUser.role === "FACULTY" && (
                        <QuizControlButtons quiz={quiz} />
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
