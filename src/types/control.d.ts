import type { Data } from '../utils/http/index'

export type DataType = {
  id: number
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
  rise: number
  count: number
}
export type ControlDataType = Data<DataType[]>
