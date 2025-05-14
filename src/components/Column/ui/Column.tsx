import type { FC } from "react";

import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon, DragIcon } from "../../../shared/icons";
import { Button } from "../../../shared/ui";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const { attributes, listeners, setNodeRef, setDroppableNodeRef, transform, isDragging } = useSortable({
    id: column.id,
    data: { type: "column" },
  });

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className={style.Column} ref={setNodeRef} style={draggingStyle}>
      <div className={style.Head}>
        <p className={style.Name}>{column.name}</p>
        <div className={style.Controls}>
          <Button {...attributes} {...listeners} size={"small"}>
            <DragIcon />
          </Button>
          <Button size={"small"}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <div className={style.Container} ref={setDroppableNodeRef}>
        <Button className={style.Button}>Add task</Button>
        {column.tasks.length === 0 && <p className={style.Empty}>No tasks here</p>}
        <SortableContext items={column.tasks}>
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
