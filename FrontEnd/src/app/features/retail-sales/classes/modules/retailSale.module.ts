import { NgModule } from '@angular/core'
// Custom
import { RetailSaleListComponent } from '../../user-interface/list/retailSale-list.component'
import { RetailSaleRoutingModule } from './retailSale.routing.module'
import { SharedModule } from 'src/app/shared/modules/shared.module'

@NgModule({
    declarations: [
        RetailSaleListComponent
    ],
    imports: [
        SharedModule,
        RetailSaleRoutingModule
    ]
})

export class RetailSaleModule { }
