import { Guid } from 'guid-typescript'
// Custom
import { DocumentTypeVM } from '../../view-models/list/documentType-vm'
import { Metadata } from 'src/app/shared/classes/metadata'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface TransactionReadDto extends Metadata {

    // PK
    transactionId: Guid
    // Fields
    date: string
    invoiceNo: number
    customer: SimpleEntity
    documentType: DocumentTypeVM
    paymentMethod: SimpleEntity
    grossAmount: number
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
