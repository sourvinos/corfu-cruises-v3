import { Injectable } from '@angular/core'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { PassengerWriteDto } from '../dtos/form/passenger-write-dto'
import { ReservationReadDto } from '../dtos/form/reservation-read-dto'
import { ReservationWriteDto } from '../dtos/form/reservation-write-dto'
import { SessionStorageService } from './../../../../shared/services/session-storage.service'

@Injectable({ providedIn: 'root' })

export class ReservationHelperService {

    constructor(private cryptoService: CryptoService, private dateHelperService: DateHelperService, private dexieService: DexieService, private sessionStorageService: SessionStorageService) { }

    //#region public methods

    public flattenForm(form: any): ReservationWriteDto {
        return {
            reservationId: form.reservationId != '' ? form.reservationId : null,
            customerId: form.customer.id,
            destinationId: form.destination.id,
            driverId: form.driver ? form.driver.id : null,
            pickupPointId: form.pickupPoint.id,
            portId: form.port.id,
            shipId: form.ship ? form.ship.id : null,
            date: this.dateHelperService.formatDateToIso(new Date(form.date)),
            refNo: form.refNo,
            ticketNo: form.ticketNo,
            email: form.email,
            phones: form.phones,
            adults: form.adults,
            kids: form.kids,
            free: form.free,
            remarks: form.remarks,
            passengers: this.mapPassengers(form)
        }
    }

    public getLinkedCustomer(): Promise<any> {
        const connectedCustomerId = parseInt(this.cryptoService.decrypt(this.sessionStorageService.getItem('customerId')))
        return new Promise((resolve) => {
            this.dexieService.getById('customers', connectedCustomerId).then((response) => {
                resolve(response)
            })
        })
    }

    public getPassengerDifferenceIcon(element: any, totalPax: number, totalPassengers: number): any {
        if (totalPassengers > 0) {
            const passengerDifference = totalPax - (element != null ? element : totalPassengers)
            switch (true) {
                case passengerDifference == 0:
                    return 'green'
                case passengerDifference < 0:
                    return 'red'
                case passengerDifference > 0:
                    return 'yellow'
            }
        } else {
            return 'yellow'
        }
    }

    public createCachedReservation(form: any): ReservationReadDto {
        return {
            reservationId: form.reservationId,
            customer: form.customer,
            destination: form.destination,
            driver: form.driver,
            pickupPoint: {
                id: form.pickupPoint.id,
                description: form.pickupPoint.description,
                exactPoint: form.exactPoint,
                time: form.time,
                port: {
                    id: form.port.id,
                    description: form.port.description
                }
            },
            port: form.port,
            ship: form.ship,
            date: form.date,
            refNo: form.refNo,
            email: form.email,
            phones: form.phones,
            remarks: form.remarks,
            adults: form.adults,
            kids: form.kids,
            free: form.free,
            totalPax: form.totalPax,
            ticketNo: form.ticketNo,
            passengers: form.passengers,
            user: form.user,
            lastUpdate: form.lastUpdate
        }
    }

    public totalPaxShouldBeEqualToPassengerCount(totalPax: number, passengerCount: number): boolean {
        return totalPax != 0 && totalPax == passengerCount
    }

    public emailShouldBeValid(email: string): boolean {
        return email != '' && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) != null
    }

    //#endregion

    //#region private methods

    private mapPassengers(form: any): PassengerWriteDto[] {
        const passengers = []
        form.passengers.forEach((passenger: any) => {
            const x: PassengerWriteDto = {
                reservationId: form.reservationId,
                genderId: passenger.gender.id,
                nationalityId: passenger.nationality.id,
                occupantId: 2,
                lastname: passenger.lastname,
                firstname: passenger.firstname,
                birthdate: this.dateHelperService.formatDateToIso(new Date(passenger.birthdate)),
                specialCare: passenger.specialCare,
                remarks: passenger.remarks,
                isCheckedIn: passenger.isCheckedIn
            }
            passengers.push(x)
        })
        return passengers
    }

    //#endregion

}
