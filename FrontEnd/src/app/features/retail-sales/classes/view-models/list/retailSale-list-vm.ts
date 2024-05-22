import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { DocumentTypeVM } from './documentType-vm'

export interface RetailSaleListVM {

    invoiceId: string
    date: string
    formattedDate: string
    customer: SimpleEntity
    documentType: DocumentTypeVM
    paymentMethod: SimpleEntity
    shipOwner: SimpleEntity
    invoiceNo: number
    grossAmount: number
    remarks: string
    isEmailSent: boolean

}
