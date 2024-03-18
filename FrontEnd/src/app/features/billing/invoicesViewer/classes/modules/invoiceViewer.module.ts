import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../../shared/modules/shared.module'
import { InvoiceViewerFormComponent } from '../../user-interface/invoiceViewer-form/invoiceViewer-form.component'
import { InvoiceViewerRoutingModule } from './invoiceViewer.routing.module'

@NgModule({
    declarations: [
        InvoiceViewerFormComponent,
    ],
    imports: [
        SharedModule,
        InvoiceViewerRoutingModule
    ]
})

export class InvoiceViewerModule { }
