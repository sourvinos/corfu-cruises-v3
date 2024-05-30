import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { RetailSaleListComponent } from '../../user-interface/list-wrapper/list/retailSale-list.component'

const routes: Routes = [
    { path: '', component: RetailSaleListComponent, canActivate: [AuthGuardService] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RetailSaleRoutingModule { }
