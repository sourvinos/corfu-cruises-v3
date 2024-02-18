import { InvoicePdfPartyTypeVM } from './invoice-pdf-partyType-vm'
import { InvoicePdfHeaderVM } from './invoice-pdf-header-vm'
import { InvoicePdfSummaryVM } from './invoice-pdf-summary-vm'
import { InvoicePdfAadeVM } from './invoice-pdf-aade-vm'

export interface InvoicePdfVM {

    header: InvoicePdfHeaderVM
    issuer: InvoicePdfPartyTypeVM
    counterPart: InvoicePdfPartyTypeVM
    summary: InvoicePdfSummaryVM
    aade: InvoicePdfAadeVM

}
