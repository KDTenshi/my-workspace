import type { FC } from "react";

import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
          <button className={style.Button} {...attributes} {...listeners}>
            drag
          </button>
          <button className={style.Button}>delete</button>
        </div>
      </div>
      <div className={style.Container} ref={setDroppableNodeRef}>
        <button className={style.Add}>Add task</button>
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
