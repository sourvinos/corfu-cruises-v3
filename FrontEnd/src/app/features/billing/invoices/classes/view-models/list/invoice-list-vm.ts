import { Guid } from 'guid-typescript'
// Custom
import { DocumentTypeVM } from './documentType-vm'
import { SimpleEntity } from '../../../../../../shared/classes/simple-entity'

export interface InvoiceListVM {

    invoiceId: Guid
    date: string
    formattedDate: string
    invoiceNo: number
    customer: SimpleEntity
    destination: SimpleEntity
    documentType: DocumentTypeVM
    ship: SimpleEntity
    totalPax: number
    grossAmount: number

}
