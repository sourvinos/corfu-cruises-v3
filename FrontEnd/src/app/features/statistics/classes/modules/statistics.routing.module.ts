import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { DestinationsResolver } from '../resolvers/destinations-resolver'
import { PortsResolver } from '../resolvers/ports-resolver'
import { StatisticsComponent } from '../../user-interface/statistics.component'
import { YTDResolver as YTDResolver } from '../resolvers/ytd-resolver'

const routes: Routes = [
    { path: '', component: StatisticsComponent, canActivate: [AuthGuardService], resolve: { ytd: YTDResolver, destinations: DestinationsResolver, ports: PortsResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StatisticsRoutingModule { }
