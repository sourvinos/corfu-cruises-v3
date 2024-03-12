import { LedgerPreviousPeriodVM } from './ledger-previous-period-vm'
import { LedgerRequestedPeriodVM } from './ledger-requested-period-vm'

export interface LedgerVM {

    previousPeriod: LedgerPreviousPeriodVM
    requestedPeriod: LedgerRequestedPeriodVM[]

}
