import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { ReceiptViewerFormComponent } from '../../user-interface/receiptViewer-form.component'

const routes: Routes = [
    { path: ':id', component: ReceiptViewerFormComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceiptViewerRoutingModule { }
