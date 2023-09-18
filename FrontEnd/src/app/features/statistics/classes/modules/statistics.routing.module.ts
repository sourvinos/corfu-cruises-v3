import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { StatisticsComponent } from '../../user-interface/statistics.component'
import { YTDResolver as YTDResolver } from '../resolvers/ytd-resolver'
import { DestinationsResolver } from '../resolvers/destinations-resolver'

const routes: Routes = [
    { path: '', component: StatisticsComponent, canActivate: [AuthGuardService], resolve: { ytd: YTDResolver, destinations: DestinationsResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StatisticsRoutingModule { }
