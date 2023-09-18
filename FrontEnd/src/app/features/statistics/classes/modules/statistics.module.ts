import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from 'src/app/shared/modules/shared.module'
import { StatisticsComponent } from '../../user-interface/statistics.component'
import { StatisticsRoutingModule } from './statistics.routing.module'
import { CardComponent } from '../../user-interface/card.component'

@NgModule({
    declarations: [
        CardComponent,
        StatisticsComponent
    ],
    imports: [
        SharedModule,
        StatisticsRoutingModule
    ]
})

export class StatisticsModule { }
