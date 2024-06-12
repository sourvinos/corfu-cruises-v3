import { NgModule } from '@angular/core'
// Custom
import { LedgerBillingRoutingModule } from './ledger-billing.routing.module'
import { LedgerCriteriaDialogComponent } from '../../user-interface/criteria/ledger-criteria.component'
import { LedgerParentBillingComponent } from '../../user-interface/list/ledger-parent.component'
import { LedgerShipOwnerTableComponent } from '../../user-interface/list/ledger-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        LedgerCriteriaDialogComponent,
        LedgerParentBillingComponent,
        LedgerShipOwnerTableComponent
    ],
    imports: [
        SharedModule,
        LedgerBillingRoutingModule
    ]
})

export class LedgerBillingModule { }
