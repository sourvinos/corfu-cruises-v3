import { InvoiceXmlHeaderDto } from './invoice-xml-header-dto'
import { InvoiceXmlPartyTypeDto } from './invoice-xml-partyType-dto'
import { InvoiceXmlPaymentMethodDto } from './invoice-xml-paymentMethod-dto'
import { InvoiceXmlRowDto } from './invoice-xml-row-dto'
import { InvoiceXmlSummaryDto } from './invoice-xml-summary-dto'

export interface InvoiceXmlDto {

    issuer: InvoiceXmlPartyTypeDto
    counterPart: InvoiceXmlPartyTypeDto
    invoiceHeader: InvoiceXmlHeaderDto
    paymentMethod: InvoiceXmlPaymentMethodDto
    invoiceRow: InvoiceXmlRowDto
    invoiceSummary: InvoiceXmlSummaryDto

}
