import type { FC } from "react";

import style from "./Task.module.css";

const Task: FC = () => {
  return (
    <div className={style.Task}>
      <p className={style.Name}>Task name</p>
      <div className={style.Controls}>
        <button className={style.Button}>edit</button>
        <button className={style.Button}>delete</button>
      </div>
    </div>
  );
};

export default Task;
