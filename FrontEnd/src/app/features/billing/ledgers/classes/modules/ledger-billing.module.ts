import { NgModule } from '@angular/core'
// Custom
import { LedgerBillingComponent } from '../../user-interface/list/ledger.component'
import { LedgerBillingRoutingModule } from './ledger-billing.routing.module'
import { LedgerCriteriaComponent } from '../../user-interface/criteria/ledger-criteria.component'
import { LedgerShipOwnerTableComponent } from '../../user-interface/list/ledger-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        LedgerCriteriaComponent,
        LedgerBillingComponent,
        LedgerShipOwnerTableComponent
    ],
    imports: [
        SharedModule,
        LedgerBillingRoutingModule
    ]
})

export class LedgerBillingModule { }
