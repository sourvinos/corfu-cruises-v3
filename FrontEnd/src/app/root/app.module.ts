// Base
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, Title } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
// Modules
import { AppRoutingModule } from './app.routing.module'
import { LoginModule } from '../features/login/classes/modules/login.module'
import { PrimeNgModule } from '../shared/modules/primeng.module'
import { SharedModule } from 'src/app/shared/modules/shared.module'
// Components
import { AppComponent } from './app.component'
import { CardsMenuComponent } from '../shared/components/home/cards-menu.component'
import { HomeComponent } from '../shared/components/home/home.component'
import { LogoutComponent } from '../shared/components/top-bar-wrapper/logout/logout.component'
import { ReservationsMenuComponent } from '../shared/components/top-bar-wrapper/reservations-menu/reservations-menu.component'
import { SearchByRefNoComponent } from '../shared/components/top-bar-wrapper/search-byRefNo-box/search-byRefNo..component'
import { TablesMenuComponent } from '../shared/components/top-bar-wrapper/tables-menu/tables-menu.component'
import { TasksMenuComponent } from '../shared/components/top-bar-wrapper/tasks-menu/tasks-menu.component'
import { TopBarComponent } from '../shared/components/top-bar-wrapper/top-bar/top-bar.component'
import { TopMenuComponent } from '../shared/components/top-bar-wrapper/top-menu/top-menu.component'
import { UserMenuComponent } from '../shared/components/top-bar-wrapper/user-menu/user-menu.component'
// Services
import { InterceptorService } from '../shared/services/interceptor.service'

@NgModule({
    declarations: [
        AppComponent,
        CardsMenuComponent,
        HomeComponent,
        LogoutComponent,
        ReservationsMenuComponent,
        SearchByRefNoComponent,
        TablesMenuComponent,
        TasksMenuComponent,
        TopBarComponent,
        TopMenuComponent,
        UserMenuComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        LoginModule,
        PrimeNgModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        Title, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
