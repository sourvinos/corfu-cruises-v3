import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { EmbarkationReservationVM } from '../view-models/list/embarkation-reservation-vm'
import { EmbarkationSearchCriteriaVM } from '../view-models/criteria/embarkation-search-criteria-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class EmbarkationHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/embarkation')
    }

    get(criteria: EmbarkationSearchCriteriaVM): Observable<EmbarkationReservationVM> {
        return this.http.request<EmbarkationReservationVM>('post', this.url, { body: criteria })
    }

    embarkSinglePassenger(id: number): Observable<any> {
        const params = new HttpParams().set('id', id)
        return this.http.patch(this.url + '/embarkPassenger?', null, { params: params })
    }

    embarkPassengers(ignoreCurrentStatus: boolean, id: number[]): Observable<any> {
        let params = new HttpParams().set('ignoreCurrentStatus', ignoreCurrentStatus)
        params = params.append('id', id[0])
        id.forEach((element, index) => {
            if (index > 0) {
                params = params.append('id', element)
            }
        })
        return this.http.patch(this.url + '/embarkPassengers?', null, { params: params })
    }

}
