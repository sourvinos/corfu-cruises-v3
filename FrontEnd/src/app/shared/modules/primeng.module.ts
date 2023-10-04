import { NgModule } from '@angular/core'
// Custom
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TableModule } from 'primeng/table'
import { TabViewModule } from 'primeng/tabview'

@NgModule({
    exports: [
        ButtonModule,
        DropdownModule,
        MultiSelectModule,
        RadioButtonModule,
        TabViewModule,
        TableModule
    ]
})

export class PrimeNgModule { }
