import { Guid } from 'guid-typescript'

export interface DocumentTypeAutoCompleteVM {

    id: Guid
    abbreviation: string
    description: string
    batch: string
    lastNo: number

}
