import { Guid } from 'guid-typescript'
// Custom
import { DocumentTypeBrowserStorageVM } from 'src/app/features/billing/documentTypes/classes/view-models/documentType-browser-storage-vm'
import { Metadata } from 'src/app/shared/classes/metadata'
import { RetailSaleReadDtoShipOwner } from './retailSale-read-dto-shipOwner'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface RetailSaleReadDto extends Metadata {

    id: number
    reservationId: Guid
    date: string
    tripDate: string
    invoiceNo: number
    documentType: DocumentTypeBrowserStorageVM
    paymentMethod: SimpleEntity
    shipOwner: RetailSaleReadDtoShipOwner
    adults: number
    adultsPrice: number
    kids: number
    kidsPrice: number
    free: number
    netAmount: number
    vatPercent: number
    vatAmount: number
    grossAmount: number
    passenger: string
    remarks: string
    postAt: string
    postUser: string
    PutAt: string
    putUser: string

}