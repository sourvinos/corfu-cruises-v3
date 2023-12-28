import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { ParametersComponent } from '../../user-interface/parameters.component'
import { ParametersResolver } from '../resolvers/parameters.resolver'

const routes: Routes = [
    { path: '', component: ParametersComponent, canActivate: [AuthGuardService], resolve: { parameters: ParametersResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ParametersRoutingModule { }
