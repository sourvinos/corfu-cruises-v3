import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { SettingsComponent } from '../../user-interface/settings.component'
import { SettingsResolver } from '../resolvers/settings.resolver'

const routes: Routes = [
    { path: '', component: SettingsComponent, canActivate: [AuthGuardService], resolve: { settings: SettingsResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SettingsRoutingModule { }