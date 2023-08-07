import { NgModule } from '@angular/core'
// Custom
import { ParametersComponent } from '../../user-interface/parameters.component'
import { ParametersRoutingModule } from './parameters.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        ParametersComponent
    ],
    imports: [
        SharedModule,
        ParametersRoutingModule
    ]
})

export class ParametersModule { }
