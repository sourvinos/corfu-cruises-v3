import { Guid } from 'guid-typescript'
// Custom
import { DocumentTypeVM } from './documentType-vm'
import { SimpleEntity } from '../../../../../../shared/classes/simple-entity'
import { CustomerVM } from '../Shared/customer-vm'

export interface InvoiceListVM {

    id: Guid
    date: string
    formattedDate: string
    no: number
    customer: CustomerVM
    destination: SimpleEntity
    documentType: DocumentTypeVM
    ship: SimpleEntity
    totalPax: number
    grossAmount: number

}
