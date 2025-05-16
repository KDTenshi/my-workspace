import { useState, type FC } from "react";
import type { TTask } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { renameTask } from "../../../shared/store/tasksSlice";
import style from "./EditTask.module.css";

interface EditTaskProps {
  task: TTask;
  setIsEdit: (p: boolean) => void;
}

const EditTask: FC<EditTaskProps> = ({ task, setIsEdit }) => {
  const [editValue, setEditValue] = useState(task.name);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;

    setEditValue(target.value);
  };

  const handleBlur = () => {
    const name = editValue.trim();

    if (name && name !== task.name) {
      dispatch(renameTask({ id: task.id, name }));
      setEditValue(name);
    } else {
      setEditValue(task.name);
    }

    setIsEdit(false);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEdit(false);
      setEditValue(task.name);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
  };
  return (
    <textarea
      value={editValue}
      onChange={handleChange}
      className={style.Edit}
      autoFocus
      onBlur={handleBlur}
      onKeyDown={handleEnterPress}
      onFocus={handleFocus}
    ></textarea>
  );
};

export default EditTask;
