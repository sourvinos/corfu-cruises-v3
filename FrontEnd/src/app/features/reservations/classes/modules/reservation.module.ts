import { NgModule } from '@angular/core'
// Custom
import { CachedReservationDialogComponent } from '../../user-interface/cached-reservation-dialog/cached-reservation-dialog.component'
import { PassengerFormComponent } from '../../user-interface/passenger-form/passenger-form.component'
import { PassengerListComponent } from '../../user-interface/passenger-list/passenger-list.component'
import { ReservationCalendarComponent } from '../../user-interface/calendar/reservation-calendar.component'
import { ReservationFormComponent } from '../../user-interface/reservation-form/reservation-form.component'
import { ReservationListComponent } from '../../user-interface/reservation-list/reservation-list.component'
import { ReservationRoutingModule } from './reservation.routing.module'
import { ReservationToDriverOrShipComponent } from '../../user-interface/reservation-to-driver-or-ship/reservation-to-driver-or-ship-form.component'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        CachedReservationDialogComponent,
        PassengerFormComponent,
        PassengerListComponent,
        ReservationCalendarComponent,
        ReservationFormComponent,
        ReservationListComponent,
        ReservationToDriverOrShipComponent
    ],
    imports: [
        SharedModule,
        ReservationRoutingModule
    ],
    entryComponents: [
        ReservationToDriverOrShipComponent
    ]
})

export class ReservationModule { }
