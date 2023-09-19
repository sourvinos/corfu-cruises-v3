import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from 'src/app/shared/modules/shared.module'
import { StatisticsComponent } from '../../user-interface/statistics.component'
import { StatisticsRoutingModule } from './statistics.routing.module'
import { TableComponent } from '../../user-interface/table.component'

@NgModule({
    declarations: [
        StatisticsComponent,
        TableComponent
    ],
    imports: [
        SharedModule,
        StatisticsRoutingModule
    ]
})

export class StatisticsModule { }
