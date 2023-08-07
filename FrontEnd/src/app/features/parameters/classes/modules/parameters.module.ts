import { NgModule } from '@angular/core'
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'
// Custom
import { ParametersComponent } from '../../user-interface/parameters.component'
import { ParametersRoutingModule } from './parameters.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        ParametersComponent
    ],
    imports: [
        NgxMatTimepickerModule,
        ParametersRoutingModule,
        SharedModule,
    ]
})

export class ParametersModule { }
