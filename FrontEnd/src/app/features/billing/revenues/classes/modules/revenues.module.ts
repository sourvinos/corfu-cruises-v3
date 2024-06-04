import { NgModule } from '@angular/core'
// Custom
import { RevenuesComponent } from '../../user-interface/list/revenues.component'
import { RevenuesCriteriaDialogComponent } from '../../user-interface/criteria/revenues-criteria-dialog.component'
import { RevenuesRoutingModule } from './revenues.routing.module'
import { RevenuesShipOwnerTableComponent } from '../../user-interface/list/revenues-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        RevenuesCriteriaDialogComponent,
        RevenuesComponent,
        RevenuesShipOwnerTableComponent
    ],
    imports: [
        SharedModule,
        RevenuesRoutingModule
    ]
})

export class RevenuesModule { }
