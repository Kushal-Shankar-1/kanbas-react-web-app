import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { setModules, addModule, deleteModule, editModule, updateModule } from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const [editedName, setEditedName] = useState(""); // Local state for the edited name
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) return;
      try {
        const data = await coursesClient.findModulesForCourse(cid);
        dispatch(setModules(data));
      } catch (error) {
        console.error(`Error fetching modules for course ${cid}:`, error instanceof Error ? error.message : error);
      }
    };

    fetchModules();
  }, [cid, dispatch]);

  const createModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = { name: moduleName, course: cid, description: "New module description" };

    try {
      const createdModule = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(createdModule));
      setModuleName("");
    } catch (error) {
      console.error(`Error creating module for course ${cid}:`, error instanceof Error ? error.message : error);
    }
  };

  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error(`Error deleting module with ID ${moduleId}:`, error instanceof Error ? error.message : error);
    }
  };

  const handleEditModule = (moduleId: string, currentName: string) => {
    setEditedName(currentName);
    dispatch(editModule(moduleId));
  };

  const handleSaveModule = async (module: any) => {
    // First, update on the server
    try {
      const updatedModuleData = { ...module, name: editedName, editing: false, lessons: module.lessons || [] };
  
      // Call the client function that sends PUT /api/modules/:moduleId
      await modulesClient.updateModule(updatedModuleData);
  
      // Now dispatch to Redux to update frontend state
      dispatch(updateModule(updatedModuleData));
  
      setEditedName("");
    } catch (error) {
      console.error(`Error saving module ${module._id}:`, error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="wd-modules">
      {currentUser.role === "FACULTY" && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={createModuleForCourse}
        />
      )}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.editing ? (
                <input
                  className="form-control w-50 d-inline-block"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={() => handleSaveModule(module)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveModule(module);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span>{module.name}</span>
              )}
              {currentUser.role === "FACULTY" && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={() => removeModule(module._id)}
                  editModule={() => handleEditModule(module._id, module.name)}
                />
              )}
            </div>
            {module.lessons && module.lessons.length > 0 && (
              <ul className="list-group list-group-flush">
                {module.lessons.map((lesson: any) => (
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
