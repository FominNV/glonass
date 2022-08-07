export interface ICoordinateState {
  firstTable: ICoordinate[];
  secondTable: ICoordinate[];
}

export interface ICoordinate {
  id: string,
  x: number,
  y: number
}

export enum CoordinateActionTypes {
  SET_FIRST_TABLE_COORDINATES = "SET_FIRST_TABLE_COORDINATES",
  SET_SECOND_TABLE_COORDINATES = "SET_SECOND_TABLE_COORDINATES",
}

export type CoordinateDispatch<T> = (todos: T) => CoordinateAction;

type SetFirstTableCoordinatesAction = {
  type: CoordinateActionTypes.SET_FIRST_TABLE_COORDINATES;
  payload: { coordinates: ICoordinate[] };
};

type SetSecondTableCoordinatesAction = {
  type: CoordinateActionTypes.SET_SECOND_TABLE_COORDINATES;
  payload: { coordinates: ICoordinate[] };
};

export type CoordinateAction = SetFirstTableCoordinatesAction | SetSecondTableCoordinatesAction;
