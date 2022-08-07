import uuid from "react-uuid";
import { CoordinateAction, CoordinateActionTypes, ICoordinateState } from "./types";

const initialState: ICoordinateState = {
  firstTable: [
    { id: uuid(), x: 1, y: 2 },
    { id: uuid(), x: 2, y: 4 },
    { id: uuid(), x: 4, y: 6 },
    { id: uuid(), x: 7, y: 7 },
  ],
  secondTable: [
    { id: uuid(), x: 2, y: -1 },
    { id: uuid(), x: 4, y: -1 },
    { id: uuid(), x: 6, y: 1 },
    { id: uuid(), x: 9, y: 2 },
    { id: uuid(), x: 11, y: 4 },
  ],
};

export function coordinateReducer(
  state: ICoordinateState = initialState,
  action: CoordinateAction,
): ICoordinateState {
  switch (action.type) {
    case CoordinateActionTypes.SET_FIRST_TABLE_COORDINATES:
      return {
        ...state,
        firstTable: action.payload.coordinates,
      };

    case CoordinateActionTypes.SET_SECOND_TABLE_COORDINATES:
      return {
        ...state,
        secondTable: action.payload.coordinates,
      };

    default:
      return state;
  }
}
