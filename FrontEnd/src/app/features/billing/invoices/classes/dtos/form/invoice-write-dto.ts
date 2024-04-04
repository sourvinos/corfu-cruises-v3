import { Guid } from 'guid-typescript'
// Custom
import { PortWriteDto } from './port-write-dto'

export interface InvoiceWriteDto {

    // PK
    invoiceId: Guid
    // FKs
    customerId: number
    destinationId: number
    documentTypeId: number
    paymentMethodId: number
    shipId: number
    // Fields
    date: string
    tripDate: string
    invoiceNo: number
    netAmount: number
    vatPercent: number
    vatAmount: number
    grossAmount: number
    invoicesPorts: PortWriteDto[]
    remarks: string
    isEmailSent: boolean
    // Metadata
    putAt: string

}
