import { NgModule } from '@angular/core'
// Custom
import { BalanceSheetComponent } from '../../user-interface/list/balanceSheet.component'
import { BalanceSheetCriteriaDialogComponent } from '../../user-interface/criteria/balanceSheet-criteria-dialog.component'
import { BalanceSheetRoutingModule } from './balanceSheet.routing.module'
import { BalanceSheetShipOwnerTableComponent } from '../../user-interface/list/balanceSheet-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        BalanceSheetCriteriaDialogComponent,
        BalanceSheetComponent,
        BalanceSheetShipOwnerTableComponent
    ],
    imports: [
        SharedModule,
        BalanceSheetRoutingModule
    ]
})

export class BalanceSheetModule { }
