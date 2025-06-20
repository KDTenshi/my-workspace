import { useState, type FC } from "react";

import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon, DragIcon, EditIcon } from "../../../shared/icons";
import { Button } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { deletecolumn, renameColumn } from "../../../shared/store/tasksSlice";
import { AddTask } from "../../AddTask";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(column.name);

  const dispatch = useAppDispatch();

  const handleColumnRename = () => {
    const name = editValue.trim();

    if (!name) return;

    if (name !== column.name) {
      dispatch(renameColumn({ id: column.id, name }));

      setIsEdit(false);
      setEditValue(name);
    } else {
      setIsEdit(false);
      setEditValue(column.name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleColumnRename();
  };

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
      {isEdit && (
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleColumnRename}
          />
        </form>
      )}
      {!isEdit && (
        <div className={style.Head}>
          <p className={style.Name}>{column.name}</p>
          <div className={style.Controls}>
            <Button {...attributes} {...listeners} size={"small"}>
              <DragIcon />
            </Button>
            <Button size={"small"} onClick={() => setIsEdit(true)}>
              <EditIcon />
            </Button>
            <Button size={"small"} onClick={() => dispatch(deletecolumn({ id: column.id }))}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      )}
      <div className={style.Container} ref={setDroppableNodeRef}>
        <AddTask columnId={column.id} />
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
