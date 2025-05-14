import type { FC } from "react";

import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon, EditIcon } from "../../../shared/icons";
import { Button } from "../../../shared/ui";

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
        <Button size={"small"}>
          <EditIcon />
        </Button>
        <Button size={"small"}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Task;
