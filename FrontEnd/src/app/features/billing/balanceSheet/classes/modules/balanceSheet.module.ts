import { NgModule } from '@angular/core'
// Custom
import { BalanceSheetComponent } from '../../user-interface/list/balanceSheet.component'
import { BalanceSheetCriteriaComponent } from '../../user-interface/criteria/balanceSheet-criteria.component'
import { BalanceSheetRoutingModule } from './balanceSheet.routing.module'
import { BalanceSheetShipOwnerTableComponent } from '../../user-interface/list/balanceSheet-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        BalanceSheetCriteriaComponent,
        BalanceSheetComponent,
        BalanceSheetShipOwnerTableComponent
    ],
    imports: [
        SharedModule,
        BalanceSheetRoutingModule
    ]
})

export class BalanceSheetModule { }
