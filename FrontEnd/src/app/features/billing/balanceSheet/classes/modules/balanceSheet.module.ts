import { NgModule } from '@angular/core'
// Custom
import { BalanceSheetParentComponent } from '../../user-interface/list/balanceSheet-parent.component'
import { BalanceSheetCriteriaDialogComponent } from '../../user-interface/criteria/balanceSheet-criteria-dialog.component'
import { BalanceSheetRoutingModule } from './balanceSheet.routing.module'
import { BalanceSheetShipOwnerTableComponent } from '../../user-interface/list/balanceSheet-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        BalanceSheetCriteriaDialogComponent,
        BalanceSheetParentComponent,
        BalanceSheetShipOwnerTableComponent
    ],
    imports: [
        SharedModule,
        BalanceSheetRoutingModule
    ]
})

export class BalanceSheetModule { }
