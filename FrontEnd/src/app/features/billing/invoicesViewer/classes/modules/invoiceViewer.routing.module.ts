import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { InvoiceViewerFormComponent } from '../../user-interface/invoiceViewer-form.component'

const routes: Routes = [
    { path: ':id', component: InvoiceViewerFormComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InvoiceViewerRoutingModule { }
