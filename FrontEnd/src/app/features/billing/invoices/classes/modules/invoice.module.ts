import { NgModule } from '@angular/core'
// Custom
import { InvoiceFormComponent } from '../../user-interface/invoice-form/invoice-form.component'
import { InvoiceListComponent } from '../../user-interface/invoice-list/invoice-list.component'
import { InvoicePortFormComponent } from '../../user-interface/port-form/port-form.component'
import { InvoicePortTotalsFormComponent } from '../../user-interface/port-totals/port-totals-form.component'
import { InvoiceRoutingModule } from './invoice.routing.module'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        InvoiceListComponent,
        InvoiceFormComponent,
        InvoicePortFormComponent,
        InvoicePortTotalsFormComponent,
    ],
    imports: [
        SharedModule,
        InvoiceRoutingModule
    ]
})

export class InvoiceModule { }
