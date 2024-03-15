// Base
import { NgModule } from '@angular/core'
import { NoPreloading, RouteReuseStrategy, RouterModule, Routes } from '@angular/router'
// Components
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { ForgotPasswordFormComponent } from '../features/reservations/users/user-interface/forgot-password/forgot-password-form.component'
import { HomeComponent } from '../shared/components/home/home.component'
import { LoginFormComponent } from '../features/reservations/login/user-interface/login-form.component'
import { ResetPasswordFormComponent } from '../features/reservations/users/user-interface/reset-password/reset-password-form.component'
// Utils
import { AuthGuardService } from '../shared/services/auth-guard.service'
import { CustomRouteReuseStrategyService } from '../shared/services/route-reuse-strategy.service'

const appRoutes: Routes = [
    // Login
    { path: '', component: LoginFormComponent, pathMatch: 'full' },
    // Auth
    { path: 'login', component: LoginFormComponent },
    { path: 'forgotPassword', component: ForgotPasswordFormComponent },
    { path: 'resetPassword', component: ResetPasswordFormComponent },
    // Home
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    // Reservations
    { path: 'reservations', loadChildren: () => import('../features/reservations/reservations/classes/modules/reservation.module').then(m => m.ReservationModule) },
    { path: 'availability', loadChildren: () => import('../features/reservations/availability/classes/modules/availability.module').then(m => m.AvailabilityModule) },
    { path: 'reservation-ledgers', loadChildren: () => import('../features/reservations/ledgers/classes/modules/ledger.module').then(m => m.LedgerModule) },
    { path: 'boarding', loadChildren: () => import('../features/reservations/boarding/classes/modules/boarding.module').then(m => m.BoardingModule) },
    { path: 'manifest', loadChildren: () => import('../features/reservations/manifest/classes/modules/manifest.module').then(m => m.ManifestModule) },
    { path: 'statistics', loadChildren: () => import('../features/reservations/statistics/classes/modules/statistics.module').then(m => m.StatisticsModule) },
    { path: 'coachRoutes', loadChildren: () => import('../features/reservations/coachRoutes/classes/modules/coachRoute.module').then(m => m.CoachRouteModule) },
    { path: 'customers', loadChildren: () => import('../features/reservations/customers/classes/modules/customer.module').then(m => m.CustomerModule) },
    { path: 'destinations', loadChildren: () => import('../features/reservations/destinations/classes/modules/destination.module').then(m => m.DestinationModule) },
    { path: 'drivers', loadChildren: () => import('../features/reservations/drivers/classes/modules/driver.module').then(m => m.DriverModule) },
    { path: 'genders', loadChildren: () => import('../features/reservations/genders/classes/modules/gender.module').then(m => m.GenderModule) },
    { path: 'pickupPoints', loadChildren: () => import('../features/reservations/pickupPoints/classes/modules/pickupPoint.module').then(m => m.PickupPointModule) },
    { path: 'ports', loadChildren: () => import('../features/reservations/ports/classes/modules/port.module').then(m => m.PortModule) },
    { path: 'registrars', loadChildren: () => import('../features/reservations/registrars/classes/modules/registrar.module').then(m => m.RegistrarModule) },
    { path: 'schedules', loadChildren: () => import('../features/reservations/schedules/classes/modules/schedule.module').then(m => m.ScheduleModule) },
    { path: 'shipCrews', loadChildren: () => import('../features/reservations/shipCrews/classes/modules/shipCrew.module').then(m => m.ShipCrewModule) },
    { path: 'crewSpecialties', loadChildren: () => import('../features/reservations/crewSpecialties/classes/modules/crewSpecialty.module').then(m => m.CrewSpecialtyModule) },
    { path: 'shipOwners', loadChildren: () => import('../features/reservations/shipOwners/classes/modules/shipOwner.module').then(m => m.ShipOwnerModule) },
    { path: 'shipRoutes', loadChildren: () => import('../features/reservations/shipRoutes/classes/modules/shipRoute.module').then(m => m.ShipRouteModule) },
    { path: 'ships', loadChildren: () => import('../features/reservations/ships/classes/modules/ship.module').then(m => m.ShipModule) },
    { path: 'users', loadChildren: () => import('../features/reservations/users/classes/modules/user.module').then(m => m.UserModule) },
    { path: 'reservation-parameters', loadChildren: () => import('../features/reservations/parameters/classes/modules/reservation-parameters.module').then(m => m.ReservationParametersModule) },
    // Billing
    { path: 'invoices', loadChildren: () => import('../features/billing/invoices/classes/modules/invoice.module').then(m => m.InvoiceModule) },
    { path: 'transactions', loadChildren: () => import('../features/billing/transactions/classes/modules/transaction.module').then(m => m.TransactionModule) },
    { path: 'documentTypes', loadChildren: () => import('../features/billing/documentTypes/classes/modules/documentType.module').then(m => m.DocumentTypeModule) },
    { path: 'paymentMethods', loadChildren: () => import('../features/billing/paymentMethods/classes/modules/paymentMethod.module').then(m => m.PaymentMethodModule) },
    { path: 'prices', loadChildren: () => import('../features/billing/prices/classes/modules/price.module').then(m => m.PriceModule) },
    { path: 'taxOffices', loadChildren: () => import('../features/billing/taxOffices/classes/modules/taxOffice.module').then(m => m.TaxOfficeModule) },
    { path: 'billing-ledgers', loadChildren: () => import('../features/billing/ledgers/classes/modules/ledger-billing.module').then(m => m.LedgerBillingModule) },
    { path: 'billing-parameters', loadChildren: () => import('../features/billing/parameters/classes/modules/billing-parameters.module').then(m => m.BillingParametersModule) },
    // Empty
    { path: '**', component: EmptyPageComponent }
]

@NgModule({
    declarations: [],
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', preloadingStrategy: NoPreloading, useHash: true })
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategyService }
    ]
})

export class AppRoutingModule { }
