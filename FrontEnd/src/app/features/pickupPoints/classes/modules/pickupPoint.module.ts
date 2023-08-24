import { NgModule } from '@angular/core'
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'
// Custom
import { PickupPointFormComponent } from '../../user-interface/pickupPoint-form.component'
import { PickupPointListComponent } from '../../user-interface/pickupPoint-list.component'
import { PickupPointRoutingModule } from './pickupPoint.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        PickupPointListComponent,
        PickupPointFormComponent,
    ],
    imports: [
        NgxMatTimepickerModule,
        PickupPointRoutingModule,
        SharedModule
    ]
})

export class PickupPointModule { }
