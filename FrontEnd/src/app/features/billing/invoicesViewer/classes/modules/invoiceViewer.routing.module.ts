import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { InvoiceViewerFormComponent } from '../../user-interface/invoiceViewer-form.component'
import { InvoiceViewerFormResolver } from '../resolvers/invoiceViewer-form.resolver'

const routes: Routes = [
    { path: ':id', component: InvoiceViewerFormComponent, resolve: { invoiceForm: InvoiceViewerFormResolver } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InvoiceViewerRoutingModule { }
