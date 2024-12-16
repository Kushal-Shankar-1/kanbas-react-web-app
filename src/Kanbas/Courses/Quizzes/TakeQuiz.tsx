// src/Kanbas/Courses/Quizzes/TakeQuiz.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "./quizzesReducer";
import * as quizzesClient from "./client";
import * as usersClient from "../../Account/client";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { setCurrentUser } from "../../Account/reducer";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

// Define interfaces for type safety
interface Quiz {
  _id: string;
  title: string;
  course: string;
  due: string;
  availableFrom: string;
  availableUntil: string;
  questions: Question[];
  points: number;
  quizType: string;
  assignmentGroup: string;
  instructions: string;
  shuffleAnswers: boolean;
  timeLimit: boolean;
  minutes: string;
  allowMultipleAttempts: boolean;
  assignTo: string;
  status: string;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestions: boolean;
  requiredToViewResults: boolean;
  requireLockdownBrowser: boolean;
  viewResponses: boolean;
  attemptNumber: number;
}

interface Question {
  _id: string;
  title: string;
  questionType: string;
  content: string;
  possibleAnswers: string[];
  correctAnswer: string;
  points: number;
}

interface RootState {
  accountReducer: {
    currentUser: any; // Define a proper User interface if available
  };
  quizzesReducer: {
    updatingQuiz: Quiz | null;
  };
}

export default function TakeQuiz() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updatingQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const [grade, setGrade] = useState(0);
  const [graded, setGraded] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any>([]);
  const [userAnswersClean, setUserAnswersClean] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to sanitize HTML
  function createMarkup(html: any) {
    return { __html: DOMPurify.sanitize(html) };
  }

  // Filter out duplicate answers (based on question ID)
  const filterUserAnswers = (userAnswers: any) => {
    const qids = new Set();
    const latestAnswers = [] as any;
    for (let i = userAnswers.length - 1; i >= 0; i--) {
      const qid = userAnswers[i].qid;
      if (!qids.has(qid)) {
        latestAnswers.push(userAnswers[i]);
        qids.add(qid);
      }
    }
    return latestAnswers;
  };

  // Update user with the quiz grade and answers
  const updateUser = (quizGrade: any) => {
    const answers = filterUserAnswers(userAnswers) as any;
  
    // Ensure quizAttempts is an array
    const updatedQuizAttempts = Array.isArray(currentUser.quizAttempts)
      ? [...currentUser.quizAttempts]
      : []; // Fallback to an empty array if undefined or null
  
    // Add the new quiz attempt
    updatedQuizAttempts.push({
      course: cid,
      user: currentUser._id,
      grade: quizGrade,
      quiz: qid,
      answers: answers,
      time: new Date().toLocaleString(),
    });
  
    // Update the user in the backend
    usersClient.updateUser({
      ...currentUser,
      quizAttempts: updatedQuizAttempts,
    });
  
    // Dispatch the updated user to Redux
    dispatch(
      setCurrentUser({
        ...currentUser,
        quizAttempts: updatedQuizAttempts,
      })
    );
  };

  // Grade the quiz based on user answers
  const gradeQuiz = () => {
    const answers = filterUserAnswers(userAnswers) as any;
    let reversedAnswers = answers.slice().reverse();
    setUserAnswersClean(reversedAnswers);

    let userPoints = 0;

    answers.forEach((answer: any) => {
        if (answer.type === "fill in blank") {
            // Grade for "fill in blank"
            if (
                answer.possibleAnswers.some((possibleAnswer: string) =>
                    possibleAnswer.trim().toLowerCase() === answer.userAnswer.trim().toLowerCase()
                )
            ) {
                userPoints += answer.points;
            }
        } else if (answer.type === "true false") {
            // Normalize to lowercase for comparison
            if (
                answer.userAnswer.trim().toLowerCase() === answer.correctAnswer.trim().toLowerCase()
            ) {
                userPoints += answer.points;
            }
        } else {
            // Grade for other question types
            if (
                answer.userAnswer.trim().toLowerCase() === answer.correctAnswer.trim().toLowerCase()
            ) {
                userPoints += answer.points;
            }
        }
    });

    setGrade(userPoints);
    setGraded(true);
    updateUser(userPoints);
};

  // Fetch the quiz data and format it
  const findQuiz = async (cid: string, qid: string) => {
    try {
        setLoading(true);

        // Fetch quiz data
        const quizData = await quizzesClient.findQuiz(cid, qid);

        if (!quizData || (Array.isArray(quizData) && quizData.length === 0)) {
            throw new Error("Quiz not found.");
        }

        const rawQuiz = Array.isArray(quizData) ? quizData[0] : quizData;

        if (!rawQuiz.questions || rawQuiz.questions.length === 0) {
            throw new Error("Quiz has no questions.");
        }

        // Correctly format questions
        const formattedQuestions: Question[] = rawQuiz.questions.map((question: any, index: number) => ({
            _id: question._id || `generated-id-${index}`,
            title: question.text || "Untitled Question",
            questionType: question.questionType || "multiple choice",
            content: question.content || "", // Ensure content uses the `content` field
            possibleAnswers: question.options || [],
            correctAnswer: question.correctAnswer || "",
            points: question.points || 1,
        }));

        if (formattedQuestions.some((q) => !q.title || !Array.isArray(q.possibleAnswers))) {
            throw new Error("One or more quiz questions are invalid.");
        }

        // Dispatch the formatted quiz data
        dispatch(
            setQuiz({
                ...rawQuiz,
                questions: formattedQuestions,
            })
        );

        setError(null);
    } catch (err: any) {
        console.error("Error fetching quiz:", err);
        setError(err.message || "An error occurred while fetching the quiz.");
    } finally {
        setLoading(false);
    }
};

  // Fetch quiz data on component mount
  useEffect(() => {
    if (cid && qid) {
      findQuiz(cid, qid);
    } else {
      setError("Course ID or Quiz ID is missing.");
    }
  }, [cid, qid]);

  if (loading) {
    return <div className="m-5">Loading Quiz...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger m-5" role="alert">
        {error}
      </div>
    );
  }

  if (!updatingQuiz) {
    return <div className="m-5">Quiz data is unavailable.</div>;
  }

  return (
    <div className="mb-2">
      <div>
        <h1>
          {updatingQuiz.title}{" "}
          {(currentUser.role === "FACULTY" || currentUser.role === "TA") && (
            <Link
              className="btn btn-lg btn-danger float-end"
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
            >
              Edit Quiz
            </Link>
          )}
        </h1>
        <div>
          <strong>Started:</strong> {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString()}
        </div>
        <br />
        <h4>Quiz Instructions:</h4>
        <div
          dangerouslySetInnerHTML={createMarkup(updatingQuiz.instructions)}
        />
      </div>
      <hr />
      {graded && (
        <div className="alert alert-success" role="alert">
          Quiz Grade:{" "}
          {`${grade} / ${updatingQuiz.points} (${((grade / updatingQuiz.points) * 100).toFixed(
            2
          )}%)`}
        </div>
      )}
      <ul id="wd-questions-take-quiz" className="list-group rounded-0">
        {updatingQuiz.questions.length > 0 ? (
          updatingQuiz.questions.map((question: any, qindex: number) => (
            <li
              key={question._id} // Added key for list items
              className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                {question.questionType !== "fill in blank" ? (
                  <span
                    className={`float-end ${
                      graded &&
                      userAnswersClean[qindex] &&
                      userAnswersClean[qindex].userAnswer ===
                        userAnswersClean[qindex].correctAnswer
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {graded &&
                      userAnswersClean[qindex] &&
                      (userAnswersClean[qindex].userAnswer ===
                      userAnswersClean[qindex].correctAnswer ? (
                        <GiCheckMark className="ms-2" />
                      ) : (
                        <RxCross2 className="ms-2" />
                      ))}
                  </span>
                ) : (
                  <span
                    className={`float-end ${
                      graded &&
                      userAnswersClean[qindex] &&
                      question.possibleAnswers.includes(
                        userAnswersClean[qindex].userAnswer
                      )
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {graded &&
                      userAnswersClean[qindex] &&
                      (question.possibleAnswers.includes(
                        userAnswersClean[qindex].userAnswer
                      ) ? (
                        <GiCheckMark className="ms-2" />
                      ) : (
                        <RxCross2 className="ms-2" />
                      ))}
                  </span>
                )}
                <span>{question.title}</span>
                <span className="float-end text-secondary">
                  {question.points} pts
                </span>
              </div>
              <div>
                <div
                  className="ms-3 mt-3"
                  dangerouslySetInnerHTML={createMarkup(question.content)}
                />
                {question.questionType === "fill in blank" && (
                  <div>
                    <input
                      className="form-control ms-4 mb-2 w-50"
                      onChange={(e) =>
                        setUserAnswers((prevAnswers: any) => {
                          const existingIndex = prevAnswers.findIndex(
                            (ans: any) => ans.qid === question._id
                          );
                          const newAnswer = {
                            qid: question._id,
                            userAnswer: e.target.value,
                            points: question.points,
                            type: question.questionType,
                            possibleAnswers: question.possibleAnswers,
                          };
                          if (existingIndex !== -1) {
                            const updatedAnswers = [...prevAnswers];
                            updatedAnswers[existingIndex] = newAnswer;
                            return updatedAnswers;
                          } else {
                            return [...prevAnswers, newAnswer];
                          }
                        })
                      }
                    />
                    {graded &&
                      (currentUser.role === "FACULTY" ||
                        currentUser.role === "TA") && (
                        <span className="text-success fw-bold ms-4">
                          Correct Answer(s):
                          <ul>
                            {question.possibleAnswers.map(
                              (element: any, index: number) => (
                                <li key={index}>{element}</li>
                              )
                            )}
                          </ul>
                        </span>
                      )}
                  </div>
                )}
                {question.questionType === "multiple choice" && (
  <div>
    {question.possibleAnswers.map((possAns: string, index: number) => (
      <div className="ms-4 mb-2" key={`mcq-${question._id}-${index}`}>
        <input
          type="radio"
          name={`mcq-${question._id}`} // Group answers by question ID
          id={`mcq-${question._id}-${index}`}
          className="me-2"
          // Ensure the radio is checked based on the state
          checked={
            userAnswers.find((ans: any) => ans.qid === question._id)?.userAnswer ===
            possAns
          }
          onChange={() =>
            setUserAnswers((prevAnswers: any) => {
              const existingIndex = prevAnswers.findIndex(
                (ans: any) => ans.qid === question._id
              );
              const newAnswer = {
                qid: question._id,
                userAnswer: possAns,
                correctAnswer: question.correctAnswer,
                points: question.points,
                type: question.questionType,
              };
              if (existingIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingIndex] = newAnswer;
                return updatedAnswers;
              } else {
                return [...prevAnswers, newAnswer];
              }
            })
          }
        />
        <label htmlFor={`mcq-${question._id}-${index}`}>{possAns}</label>
      </div>
    ))}
    {graded &&
      (currentUser.role === "FACULTY" || currentUser.role === "TA") && (
        <span className="text-success fw-bold ms-4">
          Correct Answer: {question.correctAnswer}
        </span>
      )}
  </div>
)}
                {question.questionType === "true false" && (
  <div className="mb-2 ms-4">
    <span>
      <input
        type="radio"
        name={`true-false-${question._id}`}
        id={`true-${question._id}`}
        className="me-2"
        checked={
          userAnswers.find((ans: any) => ans.qid === question._id)?.userAnswer ===
          "true"
        }
        onChange={() =>
          setUserAnswers((prevAnswers: any) => {
            const existingIndex = prevAnswers.findIndex(
              (ans: any) => ans.qid === question._id
            );
            const newAnswer = {
              qid: question._id,
              userAnswer: "true",
              correctAnswer: question.correctAnswer,
              points: question.points,
              type: question.questionType,
            };
            if (existingIndex !== -1) {
              const updatedAnswers = [...prevAnswers];
              updatedAnswers[existingIndex] = newAnswer;
              return updatedAnswers;
            } else {
              return [...prevAnswers, newAnswer];
            }
          })
        }
      />
      <label htmlFor={`true-${question._id}`}>True</label>
    </span>
    <br />
    <span>
      <input
        type="radio"
        name={`true-false-${question._id}`}
        id={`false-${question._id}`}
        className="me-2"
        checked={
          userAnswers.find((ans: any) => ans.qid === question._id)?.userAnswer ===
          "false"
        }
        onChange={() =>
          setUserAnswers((prevAnswers: any) => {
            const existingIndex = prevAnswers.findIndex(
              (ans: any) => ans.qid === question._id
            );
            const newAnswer = {
              qid: question._id,
              userAnswer: "false",
              correctAnswer: question.correctAnswer,
              points: question.points,
              type: question.questionType,
            };
            if (existingIndex !== -1) {
              const updatedAnswers = [...prevAnswers];
              updatedAnswers[existingIndex] = newAnswer;
              return updatedAnswers;
            } else {
              return [...prevAnswers, newAnswer];
            }
          })
        }
      />
      <label htmlFor={`false-${question._id}`}>False</label>
    </span>
    <br />
    {graded &&
      (currentUser.role === "FACULTY" || currentUser.role === "TA") && (
        <span className="text-success fw-bold">
          Correct Answer: {question.correctAnswer}
        </span>
      )}
  </div>
)}

              </div>
            </li>
          ))
        ) : (
          <div className="alert alert-danger" role="alert">
            No Questions Have Been Created For this Quiz.
          </div>
        )}
      </ul>
      <div>
        {updatingQuiz.questions.length > 0 && (
          <span className="mb-2">
            {!graded && (
              <button className="btn btn-primary" onClick={gradeQuiz}>
                Grade Quiz
              </button>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
