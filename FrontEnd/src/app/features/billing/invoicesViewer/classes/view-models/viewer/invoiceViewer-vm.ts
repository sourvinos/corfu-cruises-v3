import { Guid } from 'guid-typescript'
// Custom
import { AadeVM } from './aade-vm'
import { DocumentTypeVM } from 'src/app/features/billing/invoices/classes/view-models/list/documentType-vm'
import { InvoiceViewerPartyTypeVM } from './invoiceViewer-partyType-vm'
import { InvoiceViewerPortVM } from '../../dtos/form/invoiceViewer-port-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface InvoiceViewerVM {

    // PK
    invoiceId: Guid
    // Fields
    date: string
    invoiceNo: number
    // Object fields
    customer: InvoiceViewerPartyTypeVM
    destination: SimpleEntity
    documentType: DocumentTypeVM
    paymentMethod: SimpleEntity
    ship: SimpleEntity
    aade: AadeVM
    issuer: InvoiceViewerPartyTypeVM
    invoicesPorts: InvoiceViewerPortVM[]
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
