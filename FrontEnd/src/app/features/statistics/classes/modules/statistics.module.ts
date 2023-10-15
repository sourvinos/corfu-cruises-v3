import { NgModule } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'
// Custom
import { GraphComponent } from '../../user-interface/graph.component'
import { SharedModule } from 'src/app/shared/modules/shared.module'
import { StatisticsComponent } from '../../user-interface/statistics.component'
import { StatisticsRoutingModule } from './statistics.routing.module'
import { TableComponent } from '../../user-interface/table.component'
import { TableNationalitiesComponent } from '../../user-interface/table-nationalities.component'

@NgModule({
    declarations: [
        GraphComponent,
        StatisticsComponent,
        TableComponent,
        TableNationalitiesComponent
    ],
    imports: [
        NgApexchartsModule,
        SharedModule,
        StatisticsRoutingModule,
    ]
})

export class StatisticsModule { }
