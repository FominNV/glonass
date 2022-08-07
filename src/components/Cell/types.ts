export interface ICellProps {
  id: string
  axis: string
  value: number
  changeCell?: VoidFunc<string | number>
}
