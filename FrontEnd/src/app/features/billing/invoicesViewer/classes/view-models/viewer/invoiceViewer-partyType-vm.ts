import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface InvoiceViewerPartyTypeVM {

    fullDescription: string
    vatNumber: string
    branch: number
    profession: string
    street: string
    number: string
    postalCode: string
    city: string
    nationality: SimpleEntity
    taxOffice: SimpleEntity
    phones: string
    email: string

}