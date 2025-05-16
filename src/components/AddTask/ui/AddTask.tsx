import { useState, type FC } from "react";

import style from "./AddTask.module.css";
import { Button } from "../../../shared/ui";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask } from "../../../shared/store/tasksSlice";

interface AddTaskProps {
  columnId: string;
}

const AddTask: FC<AddTaskProps> = ({ columnId }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const handleTaskAdd = () => {
    const name = value.trim();

    if (name) dispatch(addTask({ columnId, name }));
  };

  const cancelAdd = () => {
    setIsAdd(false);
    setValue("");
  };

  const handleBlur = () => {
    handleTaskAdd();
    cancelAdd();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTaskAdd();
    cancelAdd();
  };

  return (
    <div className={style.Add}>
      {!isAdd && (
        <Button className={style.Button} onClick={() => setIsAdd(true)}>
          Add task
        </Button>
      )}
      {isAdd && (
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
        </form>
      )}
    </div>
  );
};

export default AddTask;
