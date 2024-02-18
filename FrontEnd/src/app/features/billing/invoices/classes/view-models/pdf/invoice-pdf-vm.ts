import { InvoicePdfPartyTypeVM } from './invoice-pdf-partyType-vm'
import { InvoicePdfHeaderVM } from './invoice-pdf-header-vm'
import { InvoicePdfSummaryVM } from './invoice-pdf-summary-vm'
import { InvoicePdfAadeVM } from './invoice-pdf-aade-vm'
import { InvoicePdfPortVM } from './invoice-pdf-port-vm'

export interface InvoicePdfVM {

    header: InvoicePdfHeaderVM
    issuer: InvoicePdfPartyTypeVM
    counterPart: InvoicePdfPartyTypeVM
    summary: InvoicePdfSummaryVM
    aade: InvoicePdfAadeVM
    ports: InvoicePdfPortVM[]

}
