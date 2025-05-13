import type { FC } from "react";

import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: task.id,
    data: { type: "task" },
  });

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef} style={draggingStyle}>
      <p className={style.Name}>{task.name}</p>
      <div className={style.Controls}>
        <button className={style.Button}>edit</button>
        <button className={style.Button}>delete</button>
      </div>
    </div>
  );
};

export default Task;
