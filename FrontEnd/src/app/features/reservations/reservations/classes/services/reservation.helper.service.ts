import { Injectable } from '@angular/core'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { PassengerWriteDto } from '../dtos/form/passenger-write-dto'
import { ReservationWriteDto } from '../dtos/form/reservation-write-dto'
import { SessionStorageService } from './../../../../../shared/services/session-storage.service'
import { RetailSaleWriteDto } from 'src/app/features/retail-sales/classes/dtos/retailSale-write-dto'
import { ReservationReadDto } from '../dtos/form/reservation-read-dto'

@Injectable({ providedIn: 'root' })

export class ReservationHelperService {

    constructor(private cryptoService: CryptoService, private dateHelperService: DateHelperService, private dexieService: DexieService, private sessionStorageService: SessionStorageService) { }

    //#region public methods

    public checkForDifferenceBetweenTotalPaxAndPassengers(element: any, totalPax: number, totalPassengers: number): boolean {
        if (totalPassengers > 0) {
            const passengerDifference = totalPax - (element != null ? element : totalPassengers)
            switch (true) {
                case passengerDifference == 0:
                    return true
                case passengerDifference < 0:
                    return false
                case passengerDifference > 0:
                    return true
            }
        } else {
            return true
        }
    }

    public flattenReservationForm(form: any): ReservationWriteDto {
        return {
            reservationId: form.reservationId != '' ? form.reservationId : null,
            customerId: form.customer.id,
            destinationId: form.destination.id,
            driverId: form.driver ? form.driver.id : null,
            pickupPointId: form.pickupPoint.id,
            portId: form.port.id,
            portAlternateId: form.portAlternate.id,
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
            putAt: form.putAt,
            passengers: this.mapPassengers(form)
        }
    }

    public flattenRetailSaleForm(form: any): RetailSaleWriteDto {
        return {
            reservationId: form.reservationId,
            documentTypeId: form.documentType.id,
            paymentMethodId: form.paymentMethod.id,
            shipOwnerId: form.shipOwner.id,
            date: this.dateHelperService.formatDateToIso(new Date(form.date)),
            invoiceNo: form.invoiceNo,
            adults: form.adults,
            adultsPrice: form.adultsPrice,
            kids: form.kids,
            kidsPrice: form.kidsPrice,
            free: form.free,
            netAmount: form.netAmount,
            vatPercent: form.vatPercent,
            vatAmount: form.vatAmount,
            passenger: form.passenger,
            remarks: form.remarks
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

    public getPassengerDifferenceColor(totalPax: number, totalPassengers: number): any {
        if (totalPassengers > 0) {
            const passengerDifference = totalPax - totalPassengers
            switch (true) {
                case passengerDifference == 0:
                    return 'green-box'
                case passengerDifference < 0:
                    return 'red-box'
                case passengerDifference > 0:
                    return 'yellow-box'
            }
        } else {
            return 'yellow-box'
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
                    description: form.port.description,
                    isActive: form.port.isActive
                },
                isActive: form.pickupPoint.isActive
            },
            port: form.port,
            portAlternate: form.portAlternate,
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
            postAt: form.postAt,
            postUser: form.postUser,
            putAt: form.putAt,
            putUser: form.putUser,
            retailSale: null
        }
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
                isBoarded: passenger.isBoarded
            }
            passengers.push(x)
        })
        return passengers
    }

    //#endregion

}
