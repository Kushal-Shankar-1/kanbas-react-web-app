// src/Kanbas/Courses/Quizzes/quizzesReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of a Quiz
interface Quiz {
  _id: string;
  title: string;
  course: string;
  due: string;
  availableFrom: string;
  availableUntil: string;
  questions: any[]; // Replace 'any' with a proper Question interface if available
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

// Define the shape of a Question (if needed)
interface Question {
  questionId: string;
  text: string;
  points: number;
  questionType: string;
  content: string;
  correctAnswer: string;
  userAnswer?: string;
  pointsReceived?: number;
  possibleAnswers: string[];
  editing: boolean;
}

// Define the initial state using the Quiz interface
interface QuizzesState {
  quizzes: Quiz[];
  updatingQuiz: Partial<Quiz> | null;
  newQuiz: Quiz;
  questions: Question[];
  updatingQuestion: Partial<Question> | null;
  newQuestion: Question;
}

const initialState: QuizzesState = {
  quizzes: [],
  updatingQuiz: null,
  newQuiz: {
    _id: "new",
    title: "New Quiz",
    course: "",
    due: "",
    availableFrom: "",
    availableUntil: "",
    questions: [],
    points: 0,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    instructions: "",
    shuffleAnswers: true,
    timeLimit: true,
    minutes: "20",
    allowMultipleAttempts: false,
    assignTo: "Everyone",
    status: "unpublished",
    showCorrectAnswers: true,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestions: false,
    requiredToViewResults: false,
    requireLockdownBrowser: false,
    viewResponses: true,
    attemptNumber: 0,
  },
  questions: [],
  updatingQuestion: null,
  newQuestion: {
    questionId: "new",
    text: "New Question",
    points: 0,
    questionType: "multiple choice",
    content: "",
    correctAnswer: "",
    possibleAnswers: ["Possible Answer"],
    editing: false,
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // Set the list of quizzes
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },

    // Add a new quiz to the quizzes array
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
      // Reset newQuiz to its initial state after adding
      state.newQuiz = {
        _id: "new",
        title: "New Quiz",
        course: "",
        due: "",
        availableFrom: "",
        availableUntil: "",
        questions: [],
        points: 0,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        instructions: "",
        shuffleAnswers: true,
        timeLimit: true,
        minutes: "20",
        allowMultipleAttempts: false,
        assignTo: "Everyone",
        status: "unpublished",
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestions: false,
        requiredToViewResults: false,
        requireLockdownBrowser: false,
        viewResponses: true,
        attemptNumber: 0,
      };
      state.updatingQuiz = null;
    },

    // Delete a quiz by its ID
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },

    // Update an existing quiz
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex((q) => q._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
      // Reset updatingQuiz after update
      state.updatingQuiz = null;
    },

    // Update the newQuiz state (used for form inputs before creation)
    updateNewQuiz: (state, action: PayloadAction<Partial<Quiz>>) => {
      state.newQuiz = { ...state.newQuiz, ...action.payload };
    },

    // Set a quiz for editing
    editQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload ? { ...q, editing: true } : q
      );
    },

    // Set the quiz being updated
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.updatingQuiz = action.payload;
    },

    // Set the list of questions (if used)
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },

    // Set the question being updated
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.updatingQuestion = action.payload;
    },
  },
});

// Export actions for dispatching
export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  setQuiz,
  setQuestions,
  updateNewQuiz,
  setQuestion,
} = quizzesSlice.actions;

// Export the reducer to be included in the store
export default quizzesSlice.reducer;
