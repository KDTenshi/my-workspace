import { useState, type FC } from "react";

import style from "./Board.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Column } from "../../Column";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { TColumn, TTask } from "../../../shared/types/types";
import { Task } from "../../Task";
import { changeColumnPosition, changeTaskColumn, changeTaskPosition } from "../../../shared/store/tasksSlice";
import { AddColumn } from "../../AddColumn";

const Board: FC = () => {
  const columns = useAppSelector((state) => state.tasks.columns);
  const dispatch = useAppDispatch();

  const [draggingItem, setDraggingItem] = useState<{ item: TTask | TColumn; type: "column" | "task" } | null>(null);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });

  const sensors = useSensors(mouseSensor);

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const { current } = active.data;

    if (!current) return;

    const activeType = current.type;

    if (activeType === "column") {
      const column = columns.find((column) => column.id === active.id);

      if (!column) return;

      setDraggingItem({ item: column, type: activeType });
    }

    if (activeType === "task") {
      const column = columns.find((column) => column.tasks.some((task) => task.id === active.id));

      if (!column) return;

      const task = column.tasks.find((task) => task.id === active.id);

      if (!task) return;

      setDraggingItem({ item: task, type: activeType });
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;
    if (active.id === over.id) return;

    const params = {
      activeId: active.id as string,
      overId: over.id as string,
    };

    const activeCurrent = active.data.current;
    const overCurrent = over.data.current;

    if (!activeCurrent || !overCurrent) return;

    if (activeCurrent.type === "column") {
      dispatch(changeColumnPosition(params));
    }

    if (activeCurrent.type === "task") {
      if (overCurrent.type === "column") {
        dispatch(changeTaskColumn(params));
      }

      if (overCurrent.type === "task") {
        dispatch(changeTaskPosition(params));
      }
    }
  };

  const renderDragOverlay = () => {
    if (!draggingItem) return;

    if (draggingItem.type === "column") {
      return <Column column={draggingItem.item as TColumn} />;
    }

    if (draggingItem.type === "task") {
      return <Task task={draggingItem.item as TTask} />;
    }
  };

  return (
    <div className={style.Board}>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        collisionDetection={pointerWithin}
        sensors={sensors}
      >
        <SortableContext items={columns}>
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </SortableContext>
        <DragOverlay>{renderDragOverlay()}</DragOverlay>
      </DndContext>
      <AddColumn />
    </div>
  );
};

export default Board;
