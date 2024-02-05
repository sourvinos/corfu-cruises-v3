import { InvoiceXmlCounterPartDto } from './invoice-xml-partyType-dto'
import { InvoiceXmlHeaderDto } from './invoice-xml-header-dto'
import { InvoiceXmlIssuerDto } from './invoice-xml-issuer-dto'
import { InvoiceXmlPaymentMethodDto } from './invoice-xml-paymentMethod-dto'
import { InvoiceXmlRowDto } from './invoice-xml-row-dto'
import { InvoiceXmlSummaryDto } from './invoice-xml-summary-dto'

export interface InvoiceXmlDto {

    issuer: InvoiceXmlIssuerDto
    counterPart: InvoiceXmlCounterPartDto
    invoiceHeader: InvoiceXmlHeaderDto
    paymentMethod: InvoiceXmlPaymentMethodDto
    invoiceRow: InvoiceXmlRowDto
    invoiceSummary: InvoiceXmlSummaryDto

}
