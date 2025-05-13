import type { FC } from "react";

import style from "./Column.module.css";

const Column: FC = () => {
  return (
    <div className={style.Column}>
      <div className={style.Head}>
        <p className={style.Name}>Column name</p>
        <div className={style.Controls}>
          <button className={style.Button}>drag</button>
          <button className={style.Button}>delete</button>
        </div>
      </div>
      <div className={style.Container}>
        <button className={style.Add}>Add task</button>
        <p className={style.Empty}>No tasks here</p>
      </div>
    </div>
  );
};

export default Column;
