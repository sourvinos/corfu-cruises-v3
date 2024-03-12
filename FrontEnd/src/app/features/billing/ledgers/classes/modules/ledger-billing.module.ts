import { NgModule } from '@angular/core'
// Custom
import { LedgerBillingComponent } from '../../user-interface/list/ledger.component'
import { LedgerBillingRoutingModule } from './ledger-billing.routing.module'
import { LedgerCriteriaComponent } from '../../user-interface/criteria/ledger-criteria.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        LedgerCriteriaComponent,
        LedgerBillingComponent
    ],
    imports: [
        SharedModule,
        LedgerBillingRoutingModule
    ]
})

export class LedgerBillingModule { }
