import { NgModule } from '@angular/core'
// Custom
import { CachedReservationDialogComponent } from '../../user-interface/cached-reservation-dialog/cached-reservation-dialog.component'
import { PassengerFormComponent } from '../../user-interface/passenger-form/passenger-form.component'
import { PassengerListComponent } from '../../user-interface/passenger-list/passenger-list.component'
import { ReservationCalendarComponent } from '../../user-interface/calendar/reservation-calendar.component'
import { ReservationFormComponent } from '../../user-interface/reservation-form/reservation-form.component'
import { ReservationListComponent } from '../../user-interface/reservation-list/reservation-list.component'
import { ReservationRoutingModule } from './reservation.routing.module'
import { ReservationToDriverComponent } from './../../user-interface/reservation-to-driver/reservation-to-driver-form.component'
import { ReservationToShipComponent } from '../../user-interface/reservation-to-ship/reservation-to-ship-form.component'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        CachedReservationDialogComponent,
        PassengerFormComponent,
        PassengerListComponent,
        ReservationCalendarComponent,
        ReservationFormComponent,
        ReservationListComponent,
        ReservationToDriverComponent,
        ReservationToShipComponent,
    ],
    imports: [
        SharedModule,
        ReservationRoutingModule
    ],
    entryComponents: [
        ReservationToDriverComponent,
        ReservationToShipComponent
    ]
})

export class ReservationModule { }
