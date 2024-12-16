// src/Kanbas/Courses/Assignments/AssignmentControlButtons.tsx

import { BsPlus, BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4 me-2" />
      <BsGripVertical className="fs-4" />
    </div>
  );
}
