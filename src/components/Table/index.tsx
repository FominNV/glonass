import { FC, ReactNode, useMemo } from "react";
import Row from "components/Row";
import Button from "components/Button";
import { ITableProps } from "./types";
import { dataTableTitle } from "./data";

import "./styles.scss";

const Table: FC<ITableProps> = ({
  defaultCoordinates, changeCell, buttonCallback, removeRow, buttonName,
}) => {
  const tableTitle = useMemo<ReactNode>(() => dataTableTitle.map((elem) => (
    <th
      key={`table_title_${elem}`}
      className="Table__th"
    >
      {elem}
    </th>
  )), []);

  const rows = useMemo<ReactNode>(() => (
    defaultCoordinates.map((elem) => (
      <Row
        key={elem.id}
        id={elem.id}
        x={elem.x}
        y={elem.y}
        changeCell={changeCell}
        removeRow={removeRow}
      />
    ))
  ), [defaultCoordinates, changeCell, removeRow]);

  return (
    <table className="Table">
      <thead>
        <tr className="Table__tr">{tableTitle}</tr>
      </thead>

      <tbody>
        {rows}

        <tr className="Table__tr">
          <td className="Table__button-wrap">
            <Button
              name={buttonName}
              callback={buttonCallback}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
