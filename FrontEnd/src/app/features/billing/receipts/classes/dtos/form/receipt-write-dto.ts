import { Guid } from 'guid-typescript'

export interface ReceiptWriteDto {

    // PK
    invoiceId: Guid
    // FKs
    customerId: number
    documentTypeId: number
    paymentMethodId: number
    // Fields
    date: string
    invoiceNo: number
    grossAmount: number
    remarks: string
    // Metadata
    putAt: string

}
