import { NgModule } from '@angular/core'
// Custom
import { CachedReservationDialogComponent } from '../../user-interface/cached-reservation-dialog/cached-reservation-dialog.component'
import { PassengerFormComponent } from '../../user-interface/passenger-form/passenger-form.component'
import { PassengerListComponent } from '../../user-interface/passenger-list/passenger-list.component'
import { ReservationAssignDialogComponet } from '../../user-interface/reservation-assign-dialog/reservation-assign-dialog.component'
import { ReservationCalendarComponent } from '../../user-interface/calendar/reservation-calendar.component'
import { ReservationFormComponent } from '../../user-interface/reservation-form/reservation-form.component'
import { ReservationListComponent } from '../../user-interface/reservation-list/reservation-list.component'
import { ReservationRoutingModule } from './reservation.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        CachedReservationDialogComponent,
        PassengerFormComponent,
        PassengerListComponent,
        ReservationCalendarComponent,
        ReservationFormComponent,
        ReservationListComponent,
        ReservationAssignDialogComponet
    ],
    imports: [
        SharedModule,
        ReservationRoutingModule
    ]
})

export class ReservationModule { }
