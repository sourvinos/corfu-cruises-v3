import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface RetailSaleListVM {

    id: number
    reservationId: string
    refNo: string
    date: SimpleEntity
    formattedDate: string
    customer: SimpleEntity
    documentType: SimpleEntity
    paymentMethod: SimpleEntity
    shipOwner: SimpleEntity
    invoiceNo: number
    grossAmount: number
    remarks: string
    isEmailSent: boolean

}
