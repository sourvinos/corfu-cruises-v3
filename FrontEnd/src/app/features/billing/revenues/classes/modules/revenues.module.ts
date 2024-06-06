import { NgModule } from '@angular/core'
// Custom
import { RevenuesParentComponent } from '../../user-interface/list/revenues-parent.component'
import { RevenuesCriteriaDialogComponent } from '../../user-interface/criteria/revenues-criteria-dialog.component'
import { RevenuesRoutingModule } from './revenues.routing.module'
import { RevenuesShipOwnerTableComponent } from '../../user-interface/list/revenues-shipOwner-table.component'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        RevenuesCriteriaDialogComponent,
        RevenuesParentComponent,
        RevenuesShipOwnerTableComponent
    ],
    imports: [
        RevenuesRoutingModule,
        SharedModule,
    ]
})

export class RevenuesModule { }
