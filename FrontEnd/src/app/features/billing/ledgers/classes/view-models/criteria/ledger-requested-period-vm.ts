import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { LedgerDocumentTypeVM } from './ledger-documentType-vm'

export interface LedgerRequestedPeriodVM {

    date: string
    customer: SimpleEntity
    documentType: LedgerDocumentTypeVM

}
