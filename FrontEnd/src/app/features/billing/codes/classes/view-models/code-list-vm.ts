import { Guid } from 'guid-typescript'

export interface CodeListVM {

    id: Guid
    description: string
    batch: string
    lastDate: string
    formattedLastDate: string
    lastNo: number
    isActive: boolean
    // Plus or Minus
    customers: string
    suppliers: string
    // myData
    isMyData: boolean
    table8_1: string
    table8_8: string
    table8_9: string

}
