import { NgModule } from '@angular/core'
// Custom
import { CodeFormComponent } from '../../user-interface/code-form.component'
import { CodeListComponent } from '../../user-interface/code-list.component'
import { CodeRoutingModule } from './code.routing.module'
import { SharedModule } from '../../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        CodeListComponent,
        CodeFormComponent
    ],
    imports: [
        CodeRoutingModule,
        SharedModule
    ]
})

export class CodeModule { }
