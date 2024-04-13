import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../../shared/modules/shared.module'
import { ReceiptViewerFormComponent } from '../../user-interface/receiptViewer-form.component'
import { ReceiptViewerRoutingModule } from './receiptViewer.routing.module'

@NgModule({
    declarations: [
        ReceiptViewerFormComponent,
    ],
    imports: [
        SharedModule,
        ReceiptViewerRoutingModule
    ]
})

export class InvoiceViewerModule { }
