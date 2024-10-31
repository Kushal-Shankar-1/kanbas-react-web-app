// src/Kanbas/Courses/Modules/index.tsx

import { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { addModule, deleteModule, editModule, updateModule } from "./reducer";
import { Module, Lesson } from "../../Database";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const [editedName, setEditedName] = useState(""); // Local state for the edited name
  const modules: Module[] = useSelector((state: any) => state.modulesReducer.modules);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid || "" }));
    setModuleName("");
  };

  const handleEditModule = (moduleId: string, currentName: string) => {
    setEditedName(currentName); // Initialize with the current name
    dispatch(editModule(moduleId)); // Set the module to editing mode
  };

  const handleSaveModule = (module: Module) => {
    dispatch(updateModule({ ...module, name: editedName, editing: false, lessons: module.lessons || [] }));
    setEditedName(""); // Clear local edit state
  };

  return (
    <div className="wd-modules">
      {/* Render ModulesControls only if the user is FACULTY */}
      {currentUser.role === "FACULTY" && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={handleAddModule}
        />
      )}
      <br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {module.editing ? (
                  <input
                    className="form-control w-50 d-inline-block"
                    value={editedName} // Local state controls the input
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={() => handleSaveModule(module)} // Save on losing focus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveModule(module); // Save on pressing Enter
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{module.name}</span>
                )}
                {/* Render ModuleControlButtons only if the user is FACULTY */}
                {currentUser.role === "FACULTY" && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={() => dispatch(deleteModule(module._id))}
                    editModule={() => handleEditModule(module._id, module.name)}
                  />
                )}
              </div>
              {/* Display lessons for each module if lessons exist */}
              {module.lessons && module.lessons.length > 0 && (
                <ul className="list-group list-group-flush">
                  {module.lessons.map((lesson: Lesson) => (
                    <li key={lesson._id} className="list-group-item">
                      <strong>{lesson.name}</strong>
                      <p>{lesson.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
