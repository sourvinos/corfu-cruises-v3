import { Guid } from 'guid-typescript'
// Custom
import { DocumentTypeVM } from './documentType-vm'
import { SimpleEntity } from '../../../../../../shared/classes/simple-entity'

export interface ReceiptListVM {

    id: Guid
    date: string
    formattedDate: string
    customer: SimpleEntity
    documentType: DocumentTypeVM
    invoiceNo: number
    grossAmount: number

}
