import { NgModule } from '@angular/core'
// Custom
import { ReceiptFormComponent } from '../../user-interface/form/receipt-form.component'
import { ReceiptListComponent } from '../../user-interface/list-wrapper/list/receipt-list.component'
import { ReceiptListCriteriaComponent } from '../../user-interface/list-wrapper/criteria/receipt-list-criteria.component'
import { ReceiptRoutingModule } from './receipt.routing.module'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        ReceiptFormComponent,
        ReceiptListComponent,
        ReceiptListCriteriaComponent,
    ],
    imports: [
        SharedModule,
        ReceiptRoutingModule
    ]
})

export class ReceiptModule { }
