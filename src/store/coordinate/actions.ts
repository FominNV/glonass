import { CoordinateActionTypes, CoordinateDispatch, ICoordinate } from "./types";

export const setFirstTableCoordinates: CoordinateDispatch<ICoordinate[]> = (coordinates) => ({
  type: CoordinateActionTypes.SET_FIRST_TABLE_COORDINATES,
  payload: { coordinates },
});

export const setSecondTableCoordinates: CoordinateDispatch<ICoordinate[]> = (coordinates) => ({
  type: CoordinateActionTypes.SET_SECOND_TABLE_COORDINATES,
  payload: { coordinates },
});
