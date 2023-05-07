import { NgModule } from '@angular/core'
// Custom
import { SettingsComponent } from '../../user-interface/settings.component'
import { SettingsRoutingModule } from './settings.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        SharedModule,
        SettingsRoutingModule
    ]
})

export class SettingsModule { }
