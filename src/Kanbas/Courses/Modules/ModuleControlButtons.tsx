import { BsPlus, BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4 me-2" />
      <BsGripVertical className="fs-4" />
    </div>
  );
}
