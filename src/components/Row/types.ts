export interface IRowProps {
  id: string
  x: number
  y: number
  changeCell?: VoidFunc<string | number>
  removeRow?: VoidFunc<string>
}
