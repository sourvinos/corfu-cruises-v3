import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface DocumentTypeBrowserStorageVM {

    id: number
    ship: SimpleEntity
    abbreviation: string
    description: string
    batch: string
    lastNo: number
    isActive: boolean

}
