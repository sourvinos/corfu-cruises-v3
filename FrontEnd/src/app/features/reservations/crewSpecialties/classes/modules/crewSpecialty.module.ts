import { NgModule } from '@angular/core'
// Custom
import { CrewSpecialtyFormComponent } from '../../user-interface/crewSpecialty-form.component'
import { CrewSpecialtyListComponent } from '../../user-interface/crewSpecialty-list.component'
import { CrewSpecialtyRoutingModule } from './crewSpecialty.routing.module'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        CrewSpecialtyListComponent,
        CrewSpecialtyFormComponent
    ],
    imports: [
        SharedModule,
        CrewSpecialtyRoutingModule
    ]
})

export class CrewSpecialtyModule { }
