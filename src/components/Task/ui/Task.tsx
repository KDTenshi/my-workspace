import { useState, type FC } from "react";

import style from "./Task.module.css";
import type { TTask } from "../../../shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon, EditIcon } from "../../../shared/icons";
import { Button } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask } from "../../../shared/store/tasksSlice";
import { EditTask } from "../../EditTask";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

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
      {isEdit && <EditTask task={task} setIsEdit={setIsEdit} />}
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
