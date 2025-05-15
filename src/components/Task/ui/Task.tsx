import { useState, type FC } from "react";

import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon, EditIcon } from "../../../shared/icons";
import { Button } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask, renameTask } from "../../../shared/store/tasksSlice";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(task.name);

  const dispatch = useAppDispatch();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: task.id,
    data: { type: "task" },
  });

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleBlur = () => {
    const name = editValue.trim();

    if (!name) return;

    if (name !== task.name) {
      dispatch(renameTask({ id: task.id, name }));

      setIsEdit(false);
      setEditValue(name);
    } else {
      setIsEdit(false);
      setEditValue(task.name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = editValue.trim();

    if (!name) return;

    if (name !== task.name) {
      dispatch(renameTask({ id: task.id, name }));

      setIsEdit(false);
      setEditValue(name);
    } else {
      setIsEdit(false);
      setEditValue(task.name);
    }
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef} style={draggingStyle}>
      {isEdit && (
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        </form>
      )}
      {!isEdit && (
        <>
          <p className={style.Name}>{task.name}</p>
          <div className={style.Controls}>
            <Button size={"small"} onClick={() => setIsEdit(true)}>
              <EditIcon />
            </Button>
            <Button size={"small"} onClick={() => dispatch(deleteTask({ id: task.id }))}>
              <DeleteIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
