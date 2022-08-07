import {
  FC, ReactNode, useCallback, useMemo, useState,
} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store";
import uuid from "react-uuid";
import Table from "components/Table";
import { setFirstTableCoordinates, setSecondTableCoordinates } from "store/coordinate/actions";
import { ICoordinate } from "store/coordinate/types";

import "./styles.scss";
import Graph from "components/Graph";
import { idArray } from "components/Table/data";

const Main: FC = () => {
  const { firstTable, secondTable } = useTypedSelector((state) => state.coordinate);
  const [averageCoordinates, setAverageCoordinates] = useState<ICoordinate[]>([]);
  const dispatch = useDispatch();

  const changeCellValueInFirstTable = useCallback<VoidFunc<string | number>>((rowId, axis, value) => {
    let newCoordinates = firstTable;
    newCoordinates = newCoordinates.map((elem) => {
      if (elem.id === rowId) {
        return { ...elem, [axis]: value };
      } return elem;
    });
    dispatch(setFirstTableCoordinates(newCoordinates));
  }, [firstTable, dispatch]);

  const changeCellValueInSecondTable = useCallback<VoidFunc<string | number>>((rowId, axis, value) => {
    let newCoordinates = secondTable;
    newCoordinates = newCoordinates.map((elem) => {
      if (elem.id === rowId) {
        return { ...elem, [axis]: value };
      } return elem;
    });
    dispatch(setSecondTableCoordinates(newCoordinates));
  }, [secondTable, dispatch]);

  const addRowToFistTable = useCallback<VoidFunc<void>>(() => {
    dispatch(setFirstTableCoordinates([...firstTable, { id: uuid(), x: 0, y: 0 }]));
  }, [firstTable, dispatch]);

  const addRowToSecondTable = useCallback<VoidFunc<void>>(() => {
    dispatch(setSecondTableCoordinates([...secondTable, { id: uuid(), x: 0, y: 0 }]));
  }, [secondTable, dispatch]);

  const removeRowFromFirstTable = useCallback<VoidFunc<string>>((id) => {
    const newCoordinates = firstTable.filter((elem) => elem.id !== id);
    dispatch(setFirstTableCoordinates(newCoordinates));
  }, [firstTable, dispatch]);

  const removeRowFromSecondTable = useCallback<VoidFunc<string>>((id) => {
    const newCoordinates = secondTable.filter((elem) => elem.id !== id);
    dispatch(setSecondTableCoordinates(newCoordinates));
  }, [secondTable, dispatch]);

  const calculateAverageCoordinates = useCallback<VoidFunc<void>>(() => {
    const countCells = Math.min(firstTable.length, secondTable.length);

    if (countCells) {
      const result: ICoordinate[] = [];
      for (let i = 0; i < countCells; i++) {
        const averageX = (firstTable[i].x + secondTable[i].x) / 2;
        const averageY = (firstTable[i].y + secondTable[i].y) / 2;
        result.push({ id: uuid(), x: averageX, y: averageY });
      }
      setAverageCoordinates(result);
    }
  }, [firstTable, secondTable]);

  const tables = useMemo<ReactNode>(() => {
    const coordinates = [firstTable, secondTable, averageCoordinates];
    const changeCells = [changeCellValueInFirstTable, changeCellValueInSecondTable, undefined];
    const removeRows = [removeRowFromFirstTable, removeRowFromSecondTable, undefined];
    const buttonNames = ["Add", "Add", "Calculate"];
    const buttonCallbacks = [addRowToFistTable, addRowToSecondTable, calculateAverageCoordinates];

    return coordinates.map((elem, i) => (
      <Table
        key={uuid()}
        defaultCoordinates={elem}
        changeCell={changeCells[i]}
        removeRow={removeRows[i]}
        buttonName={buttonNames[i]}
        buttonCallback={buttonCallbacks[i]}
      />
    ));
  }, [
    firstTable,
    secondTable,
    averageCoordinates,
    addRowToFistTable,
    addRowToSecondTable,
    removeRowFromFirstTable,
    removeRowFromSecondTable,
    changeCellValueInFirstTable,
    changeCellValueInSecondTable,
    calculateAverageCoordinates,
  ]);

  const graphs = useMemo<ReactNode>(() => {
    const coordinateArray: ICoordinate[][] = [firstTable, secondTable, averageCoordinates];

    return coordinateArray.map((elem, i) => (
      <Graph
        id={idArray[i]}
        coordinates={elem}
      />
    ));
  }, [firstTable, secondTable, averageCoordinates]);

  return (
    <div className="Main">
      <p className="Main__title">
        Координаты могут принимать значение от -99 до 100 включительно.
        <br />
        {" "}
        Для подтверждения изменения координаты необходимо нажать клавишу "Enter".
      </p>
      <div className="Main__tables">{tables}</div>
      <div className="Main__graphs">{graphs}</div>
    </div>
  );
};

export default Main;
