import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../../shared/modules/shared.module'
import { ReceiptFormComponent } from '../../user-interface/form/receipt-form.component'
import { ReceiptListComponent } from '../../user-interface/list/receipt-list.component'
import { ReceiptRoutingModule } from './receipt.routing.module'

@NgModule({
    declarations: [
        ReceiptListComponent,
        ReceiptFormComponent
    ],
    imports: [
        SharedModule,
        ReceiptRoutingModule
    ]
})

export class ReceiptModule { }
