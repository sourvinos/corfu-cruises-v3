import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../../shared/modules/shared.module'
import { TransactionFormComponent } from '../../user-interface/form/transaction-form.component'
import { TransactionListComponent } from '../../user-interface/list/transaction-list.component'
import { TransactionRoutingModule } from './transaction.routing.module'

@NgModule({
    declarations: [
        TransactionListComponent,
        TransactionFormComponent
    ],
    imports: [
        SharedModule,
        TransactionRoutingModule
    ]
})

export class TransactionModule { }
