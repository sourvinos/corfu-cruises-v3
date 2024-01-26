import { Guid } from 'guid-typescript'
// Custom
import { AadeVM } from '../view-models/aade-vm'
import { CustomerVM } from '../view-models/customer-vm'
import { DocumentTypeVM } from '../view-models/documentType-vm'
import { Metadata } from 'src/app/shared/classes/metadata'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { PortReadDto } from './port-read-dto'

export interface InvoiceReadDto extends Metadata {

    // PK
    invoiceId: Guid
    // Fields
    date: string
    no: number
    // Object fields
    customer: CustomerVM
    destination: SimpleEntity
    documentType: DocumentTypeVM
    paymentMethod: SimpleEntity
    ship: SimpleEntity
    aade: AadeVM
    ports: PortReadDto[]
    // Fields
    remarks: string
    // Persons
    adults: number
    kids: number
    free: number
    totalPax: number
    // Amounts
    netAmount: number
    vatPercent: number
    vatAmount: number
    grossAmount: number

}
