import { Guid } from 'guid-typescript'

export interface TransactionWriteDto {

    // PK
    transactionId: Guid
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
