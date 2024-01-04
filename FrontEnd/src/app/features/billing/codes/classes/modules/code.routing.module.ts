import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { CodeFormComponent } from '../../user-interface/code-form.component'
import { CodeFormResolver } from '../resolvers/code-form.resolver'
import { CodeListComponent } from '../../user-interface/code-list.component'
import { CodeListResolver } from '../resolvers/code-list.resolver'

const routes: Routes = [
    { path: '', component: CodeListComponent, canActivate: [AuthGuardService], resolve: { codeList: CodeListResolver } },
    { path: 'new', component: CodeFormComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: CodeFormComponent, canActivate: [AuthGuardService], resolve: { codeForm: CodeFormResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CodeRoutingModule { }
