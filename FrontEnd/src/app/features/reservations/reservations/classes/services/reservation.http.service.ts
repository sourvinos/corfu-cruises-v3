import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { AssignmentVM } from '../view-models/assignments/assignment-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ReservationListVM } from '../view-models/list/reservation-list-vm'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ReservationHttpService extends HttpDataService {

    constructor(httpClient: HttpClient, private sessionStorageService: SessionStorageService) {
        super(httpClient, environment.apiUrl + '/reservations')
    }

    public getForCalendar(): Observable<any> {
        const fromDate = this.sessionStorageService.getItem('fromDate')
        const toDate = this.sessionStorageService.getItem('toDate')
        if (fromDate != '') {
            return this.http.get<any>(this.url + '/fromDate/' + fromDate + '/toDate/' + toDate)
        }
    }

    public getByDate(date: string): Observable<ReservationListVM> {
        return this.http.get<ReservationListVM>(this.url + '/date/' + date)
    }

    public getByDateAndDriver(date: string, driverId: number): Observable<any> {
        return this.http.get<any>(this.url + '/date/' + date + '/driver/' + driverId)
    }

    public getByRefNo(refNo: string): Observable<ReservationListVM> {
        return this.http.get<ReservationListVM>(this.url + '/refNo/' + refNo)
    }

    public saveReservation(formData: any): Observable<any> {
        return formData.reservationId == null
            ? this.http.post<any>(this.url, formData)
            : this.http.put<any>(this.url, formData)
    }

    public assignToDriver(driverId: number, reservationIds: string[]): Observable<any> {
        const x: AssignmentVM = {
            id: driverId,
            reservationIds: reservationIds
        }
        return this.http.post(this.url + '/assignToDriver', x)
    }

    public assignToPort(portId: number, reservationIds: string[]): Observable<any> {
        const x: AssignmentVM = {
            id: portId,
            reservationIds: reservationIds
        }
        return this.http.post(this.url + '/assignToPort', x)
    }

    public assignToShip(shipId: number, reservationIds: any[]): Observable<any> {
        const x: AssignmentVM = {
            id: shipId,
            reservationIds: reservationIds
        }
        return this.http.post(this.url + '/assignToShip', x)
    }

    public isDestinationOverbooked(date: string, destinationId: number): Observable<number> {
        return this.http.get<number>(this.url + '/overbookedPax/date/' + date + '/destinationid/' + destinationId)
    }

    public deleteRange(ids: string[]): Observable<any> {
        return this.http.request<void>('delete', this.url + '/deleteRange', { body: ids })
    }

}
