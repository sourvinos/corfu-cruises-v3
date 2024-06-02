import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { BalanceSheetComponent } from '../../user-interface/list/balanceSheet.component'

const routes: Routes = [
    { path: '', component: BalanceSheetComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BalanceSheetRoutingModule { }
