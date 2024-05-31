import { Guid } from 'guid-typescript'

export interface RetailSaleWriteDto {

    // FKs
    reservationId: Guid
    documentTypeId: number
    paymentMethodId: number
    shipOwnerId: number
    // Fields
    date: string
    invoiceNo: string
    adults: number
    adultsPrice: number
    kids: number,
    kidsPrice: number,
    free: number,
    netAmount: number
    vatPercent: number
    vatAmount: number
    passenger: string
    remarks: string

}
