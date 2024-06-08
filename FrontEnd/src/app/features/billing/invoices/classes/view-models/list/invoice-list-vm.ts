import { DocumentTypeVM } from './documentType-vm'
import { InvoiceListAadeVM } from './invoice-list-aade-vm'
import { SimpleEntity } from '../../../../../../shared/classes/simple-entity'

export interface InvoiceListVM {

    customer: SimpleEntity
    date: string
    destination: SimpleEntity
    documentType: DocumentTypeVM
    batch: string
    grossAmount: number
    invoiceId: string
    invoiceNo: number
    formattedDate: string
    isEmailSent: boolean
    ship: SimpleEntity
    shipOwner: SimpleEntity
    aade: InvoiceListAadeVM

}
