import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { TransactionFormComponent } from '../../user-interface/form/transaction-form.component'
import { TransactionFormResolver } from '../resolvers/transaction-form.resolver'
import { TransactionListComponent } from '../../user-interface/list/transaction-list.component'
import { TransactionListResolver } from '../resolvers/transaction-list.resolver'

const routes: Routes = [
    { path: '', component: TransactionListComponent, canActivate: [AuthGuardService], resolve: { transactionList: TransactionListResolver }, runGuardsAndResolvers: 'always' },
    { path: 'new', component: TransactionFormComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: TransactionFormComponent, canActivate: [AuthGuardService], resolve: { transactionForm: TransactionFormResolver } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TransactionRoutingModule { }
