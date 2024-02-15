import { NgModule } from '@angular/core'
import { CurrencyMaskModule } from 'ng2-currency-mask'
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
        CurrencyMaskModule,
        SharedModule,
        InvoiceRoutingModule
    ]
})

export class InvoiceModule { }
