import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { ManifestCriteriaComponent } from '../../user-interface/criteria/manifest-criteria.component'
import { ManifestListComponent } from '../../user-interface/list/manifest-list.component'
import { ManifestPassengerListResolver } from '../resolvers/manifest-passenger-list.resolver'

const routes: Routes = [
    { path: '', component: ManifestCriteriaComponent, canActivate: [AuthGuardService] },
    { path: 'list', component: ManifestListComponent, canActivate: [AuthGuardService], resolve: { manifestList: ManifestPassengerListResolver }, runGuardsAndResolvers: 'always' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ManifestRoutingModule { }