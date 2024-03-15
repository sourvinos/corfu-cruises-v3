import { NgModule } from '@angular/core'
// Custom
import { BillingParametersComponent } from '../../user-interface/billing-parameters.component'
import { BillingParametersRoutingModule } from './billing-parameters.routing.module'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        BillingParametersComponent
    ],
    imports: [
        BillingParametersRoutingModule,
        SharedModule,
    ]
})

export class BillingParametersModule { }
