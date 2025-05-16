import { useState, type FC } from "react";

import style from "./AddColumn.module.css";
import { useAppDispatch } from "../../../app/store/appStore";
import { Button } from "../../../shared/ui";
import { addColumn } from "../../../shared/store/tasksSlice";

const AddColumn: FC = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const handleColumnAdd = () => {
    const name = value.trim();

    if (name) dispatch(addColumn({ name }));
  };

  const cancelAdd = () => {
    setIsAdd(false);
    setValue("");
  };

  const handleBlur = () => {
    handleColumnAdd();
    cancelAdd();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleColumnAdd();
    cancelAdd();
  };

  return (
    <div className={style.Add}>
      {!isAdd && (
        <Button size={"large"} onClick={() => setIsAdd(true)}>
          Add column
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
          <div className={style.Expander}></div>
        </form>
      )}
    </div>
  );
};

export default AddColumn;
