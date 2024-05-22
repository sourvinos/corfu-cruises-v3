import { NgModule } from '@angular/core'
// Custom
import { RetailSaleListComponent } from '../../user-interface/list-wrapper/list/retailSale-list.component'
import { RetailSaleListCriteriaComponent } from '../../user-interface/list-wrapper/criteria/retailSale-list-criteria.component'
import { RetailSaleRoutingModule } from './retailSale.routing.module'
import { SharedModule } from 'src/app/shared/modules/shared.module'

@NgModule({
    declarations: [
        RetailSaleListCriteriaComponent,
        RetailSaleListComponent
    ],
    imports: [
        SharedModule,
        RetailSaleRoutingModule
    ]
})

export class RetailSaleModule { }
