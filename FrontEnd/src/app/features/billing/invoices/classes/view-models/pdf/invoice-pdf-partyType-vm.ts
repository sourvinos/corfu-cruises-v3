import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface InvoicePdfPartyTypeVM {

    description: string
    vatNumber: string
    branch: number
    profession: string
    address: InvoicePdfAddressVM
    country: SimpleEntity
    phones: string
    email: string

}

export interface InvoicePdfAddressVM {
    street: string
    number: string
    postalCode: string
    city: string

}
