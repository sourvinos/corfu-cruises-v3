import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface DocumentTypeAutoCompleteVM {

    id: number
    abbreviation: string
    description: string
    shipOwner: SimpleEntity
    batch: string
    lastNo: number

}
