import { NgModule } from '@angular/core'
// Custom
import { InvoiceFormComponent } from '../../user-interface/invoice-form/invoice-form.component'
import { InvoiceListComponent } from '../../user-interface/invoice-list/invoice-list.component'
import { InvoiceRoutingModule } from './invoice.routing.module'
import { SharedModule } from '../../../../../shared/modules/shared.module'
import { AadePanelComponent } from '../../user-interface/aade-panel/aade-panel.component'

@NgModule({
    declarations: [
        InvoiceListComponent,
        InvoiceFormComponent,
        AadePanelComponent
    ],
    imports: [
        SharedModule,
        InvoiceRoutingModule
    ]
})

export class InvoiceModule { }
