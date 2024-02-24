import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { CrewSpecialtyFormComponent } from '../../user-interface/crewSpecialty-form.component'
import { CrewSpecialtyFormResolver } from '../resolvers/crewSpecialty-form.resolver'
import { CrewSpecialtyListComponent } from '../../user-interface/crewSpecialty-list.component'
import { CrewSpecialtyListResolver } from '../resolvers/crewSpecialty-list.resolver'

const routes: Routes = [
    { path: '', component: CrewSpecialtyListComponent, canActivate: [AuthGuardService], resolve: { crewSpecialtyList: CrewSpecialtyListResolver } },
    { path: 'new', component: CrewSpecialtyFormComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: CrewSpecialtyFormComponent, canActivate: [AuthGuardService], resolve: { crewSpecialtyForm: CrewSpecialtyFormResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CrewSpecialtyRoutingModule { }