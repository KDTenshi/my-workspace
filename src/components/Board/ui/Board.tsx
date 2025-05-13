import type { FC } from "react";

import style from "./Board.module.css";

const Board: FC = () => {
  return (
    <div className={style.Board}>
      <button className={style.Button}>Add column</button>
    </div>
  );
};

export default Board;
