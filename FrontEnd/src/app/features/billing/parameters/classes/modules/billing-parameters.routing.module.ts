import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { BillingParametersComponent } from '../../user-interface/billing-parameters.component'
import { BillingParametersResolver } from '../resolvers/billing-parameters.resolver'

const routes: Routes = [
    { path: '', component: BillingParametersComponent, canActivate: [AuthGuardService], resolve: { parameters: BillingParametersResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BillingParametersRoutingModule { }
