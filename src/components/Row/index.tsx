import { FC, useCallback } from "react";
import Cell from "components/Cell";
import Button from "components/Button";
import classNames from "classnames";
import { IRowProps } from "./types";

import "./styles.scss";

const Row: FC<IRowProps> = ({
  id, x, y, changeCell, removeRow,
}) => {
  const removeCurrentRow = useCallback(() => {
    if (removeRow) {
      removeRow(id);
    }
  }, [id, removeRow]);

  const buttonWrapClassName = classNames(
    "Row__button-wrap",
    { "Row__button-wrap_hidden": !removeRow },
  );

  return (
    <tr className="Row">
      <Cell
        key={`x_${id}`}
        id={id}
        axis="x"
        value={x}
        changeCell={changeCell}
      />
      <Cell
        key={`y_${id}`}
        id={id}
        axis="y"
        value={y}
        changeCell={changeCell}
      />
      <td className={buttonWrapClassName}>
        <Button
          name="Delete"
          callback={removeCurrentRow}
        />
      </td>
    </tr>
  );
};

export default Row;
