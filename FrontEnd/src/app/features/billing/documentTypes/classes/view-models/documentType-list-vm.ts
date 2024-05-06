import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface DocumentTypeListVM {

    id: number
    ship: SimpleEntity
    shipOwner: SimpleEntity
    abbreviation: string
    description: string
    batch: string
    isActive: boolean
    customers: string
    suppliers: string
    isMyData: boolean
    table8_1: string
    table8_8: string
    table8_9: string

}
