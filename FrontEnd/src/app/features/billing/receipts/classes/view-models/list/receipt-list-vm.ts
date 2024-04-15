import { DocumentTypeVM } from './documentType-vm'
import { SimpleEntity } from '../../../../../../shared/classes/simple-entity'

export interface ReceiptListVM {

    invoiceId: string
    date: string
    formattedDate: string
    customer: SimpleEntity
    documentType: DocumentTypeVM
    shipOwner: SimpleEntity
    paymentMethod: SimpleEntity
    invoiceNo: number
    grossAmount: number
    remarks: string
    isEmailSent: boolean

}
