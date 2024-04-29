import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../../shared/modules/shared.module'
import { BankAccountFormComponent } from '../../user-interface/bankAccount-form.component'
import { BankAccountListComponent } from '../../user-interface/bankAccount-list.component'
import { BankAccountRoutingModule } from './bankAccount.routing.module'

@NgModule({
    declarations: [
        BankAccountListComponent,
        BankAccountFormComponent
    ],
    imports: [
        SharedModule,
        BankAccountRoutingModule
    ]
})

export class BankAccountModule { }
