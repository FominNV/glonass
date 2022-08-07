import { ICoordinate } from "store/coordinate/types";

export interface ITableProps {
  defaultCoordinates: ICoordinate[]
  changeCell?: VoidFunc<string | number>
  removeRow?: VoidFunc<string>
  buttonCallback: VoidFunc<void>
  buttonName: string
}
