import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { setQuiz } from "./quizzesReducer";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();
    const [status, setStatus] = useState(false);
    const [questionId, setQuestionId] = useState("");
    const { updatingQuiz } = useSelector((state: any) => state.quizzesReducer);
    const [currentQuestions, setCurrentQuestions] = useState<any>([]);
    const [questionType, setQuestionType] = useState("multiple choice");
    const [title, setTitle] = useState("");
    const [points, setPoints] = useState<number>(1);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [possibleAnswers, setPossibleAnswers] = useState<string[]>(["Option 1"]);
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const quillRef = useRef(null);

    const createMarkup = (html: string) => ({ __html: DOMPurify.sanitize(html) });

    const handleContentChange = (content: string) => setContent(content);

    const handleClickEdit = (question: any) => {
        setQuestionId(question.questionId);
        setTitle(question.text || "");
        setPoints(question.points || 1);
        setCorrectAnswer(question.correctAnswer || "");
        setPossibleAnswers(question.options || ["Option 1"]);
        setContent(question.content || "");
        setQuestionType(question.questionType || "multiple choice");

        setCurrentQuestions((prevQuestions: any) =>
            prevQuestions.map((q: any) =>
                q.questionId === question.questionId ? { ...q, editing: true } : { ...q, editing: false }
            )
        );
    };

    const deletePossibleAnswer = (index: number) => {
        setPossibleAnswers(possibleAnswers.filter((_, i) => i !== index));
    };

    const addPossibleAnswer = () => {
        setPossibleAnswers([...possibleAnswers, `Option ${possibleAnswers.length + 1}`]);
    };

    const validateQuestion = () => {
        if (!title.trim()) {
            alert("Please fill in the question title.");
            return false;
        }

        if (questionType === "multiple choice" || questionType === "fill in blank") {
            if (possibleAnswers.some((answer) => !answer.trim())) {
                alert("Please fill in all options or blanks.");
                return false;
            }
        }

        if ((questionType === "multiple choice" || questionType === "true false") && !correctAnswer.trim()) {
            alert("Please specify a correct answer.");
            return false;
        }

        return true;
    };

    const saveQuestion = async () => {
        if (!validateQuestion()) return;
    
        const updatedQuestion = {
            questionId: questionId || new Date().getTime().toString(),
            text: title.trim(),
            points,
            questionType,
            content: content.trim(),
            correctAnswer: questionType === "true false" ? correctAnswer.trim().toLowerCase() : correctAnswer,
            options: questionType === "true false" ? ["true", "false"] : possibleAnswers,
            editing: false,
        };
    
        const updatedQuestions = currentQuestions.map((q: any) =>
            q.questionId === updatedQuestion.questionId ? updatedQuestion : q
        );
    
        setCurrentQuestions(updatedQuestions);
    
        const updatedQuiz = {
            ...updatingQuiz,
            questions: updatedQuestions,
        };
    
        try {
            await client.updateQuiz(updatedQuiz);
            dispatch(setQuiz(updatedQuiz));
            alert("Question saved successfully.");
        } catch (error) {
            console.error("Error saving question:", error);
            alert("Failed to save the question.");
        }
    };

    const saveAllQuestions = async () => {
        const validQuestions = currentQuestions.filter((q: any) => {
            if (q.questionType === "fill in blank") {
                return q.text && q.options.length > 0 && !q.options.some((answer: string) => !answer.trim());
            }
            return q.text && q.options.length > 0 && q.correctAnswer;
        });

        const totalPoints = validQuestions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

        const updatedQuiz = {
            ...updatingQuiz,
            questions: validQuestions,
            points: totalPoints,
        };

        try {
            await client.updateQuiz(updatedQuiz);
            dispatch(setQuiz(updatedQuiz));
            setStatus(true);
            alert("All questions saved successfully.");
        } catch (error) {
            console.error("Error saving quiz:", error);
            alert("Failed to save the quiz.");
        }
    };

    const findQuiz = async (cid: string, qid: string) => {
        try {
            const quiz = await client.findQuiz(cid, qid);
            dispatch(setQuiz(quiz[0]));
            setCurrentQuestions(quiz[0].questions || []);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            alert("Failed to load quiz.");
        }
    };

    useEffect(() => {
        if (cid && qid) {
            findQuiz(cid, qid);
        }
    }, [cid, qid]);

    return (
        <div id="wd-quiz-questions-page" className="text-center">
            {status && (
                <div className="alert alert-success" role="alert">
                    Successfully Saved Questions! Return to 'Details' Page to Save Quiz.
                </div>
            )}
            <Link
                className="btn btn-lg btn-light mt-5 border border-dark"
                to="#"
                onClick={() => {
                    const questId = new Date().getTime().toString();
                    const newQuestionData = {
                        questionId: questId,
                        text: "",
                        points: 1,
                        questionType: "multiple choice",
                        content: "",
                        options: ["Option 1"],
                        correctAnswer: "",
                        editing: true,
                    };
                    setCurrentQuestions((prevQuestions: any) => [...prevQuestions, newQuestionData]);
                    handleClickEdit(newQuestionData);
                }}
            >
                + New Question
            </Link>
            <div id="wd-quiz-questions">
                <ul id="wd-questions" className="list-group rounded-0">
                    {currentQuestions.length > 0 ? (
                        currentQuestions.map((q: any) => (
                            q.editing ? (
                                <div key={q.questionId} className="mb-4">
                                    <div className="form-group row">
                                        <div className="col-sm-3">
                                            <input
                                                id="question-title"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Question Title"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <select
                                                className="form-control"
                                                value={questionType}
                                                onChange={(e) => setQuestionType(e.target.value)}
                                            >
                                                <option value="multiple choice">Multiple Choice</option>
                                                <option value="fill in blank">Fill in the Blank</option>
                                                <option value="true false">True/False</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-4">
                                            <span>
                                                Points:{" "}
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={points}
                                                    onChange={(e) => setPoints(Number(e.target.value))}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={handleContentChange}
                                        ref={quillRef}
                                    />
                                    <div>
                                        {questionType === "multiple choice" && (
                                            <div>
                                                {possibleAnswers.map((answer, index) => (
                                                    <div key={index} className="d-flex align-items-center mb-2">
                                                        <input
                                                            type="radio"
                                                            name="correctAnswer"
                                                            value={answer}
                                                            checked={correctAnswer === answer}
                                                            onChange={(e) => setCorrectAnswer(e.target.value)}
                                                            className="me-2"
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={answer}
                                                            onChange={(e) =>
                                                                setPossibleAnswers(
                                                                    possibleAnswers.map((a, i) =>
                                                                        i === index ? e.target.value : a
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        <FaTrash
                                                            className="ms-2 text-danger"
                                                            onClick={() => deletePossibleAnswer(index)}
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={addPossibleAnswer}
                                                    className="btn btn-secondary"
                                                >
                                                    + Add Option
                                                </button>
                                            </div>
                                        )}
                                        {questionType === "true false" && (
                                            <div>
                                                {["True", "False"].map((option) => (
                                                    <div key={option} className="d-flex align-items-center mb-2">
                                                        <input
                                                            type="radio"
                                                            name="correctAnswer"
                                                            value={option}
                                                            checked={correctAnswer === option}
                                                            onChange={(e) => setCorrectAnswer(e.target.value)}
                                                            className="me-2"
                                                        />
                                                        <label>{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {questionType === "fill in blank" && (
                                            <div>
                                                {possibleAnswers.map((answer, index) => (
                                                    <div key={index} className="d-flex align-items-center mb-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={answer}
                                                            onChange={(e) =>
                                                                setPossibleAnswers(
                                                                    possibleAnswers.map((a, i) =>
                                                                        i === index ? e.target.value : a
                                                                    )
                                                                )
                                                            }
                                                            placeholder={`Answer for Blank ${index + 1}`}
                                                        />
                                                        <FaTrash
                                                            className="ms-2 text-danger"
                                                            onClick={() => deletePossibleAnswer(index)}
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => setPossibleAnswers([...possibleAnswers, ""])}
                                                    className="btn btn-secondary"
                                                >
                                                    + Add Blank
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={saveQuestion} className="btn btn-success mt-3">
                                        Save Question
                                    </button>
                                </div>
                            ) : (
                                <li key={q.questionId} className="list-group-item">
                                    <div>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleClickEdit(q)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                setCurrentQuestions(
                                                    currentQuestions.filter(
                                                        (cq: { questionId: string }) => cq.questionId !== q.questionId
                                                    )
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                        <span>{q.text}</span>
                                    </div>
                                </li>
                            )
                        ))
                    ) : (
                        <p>No Questions Found</p>
                    )}
                </ul>
            </div>
            <button onClick={saveAllQuestions} className="btn btn-danger mt-4">
                Save All Questions
            </button>
        </div>
    );
}
