import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
// Custom
import { RevenuesCriteriaVM } from '../criteria/revenues-criteria-vm'
import { RevenuesVM } from '../list/revenues-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class RevenuesHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/revenues')
    }

    get(criteria: RevenuesCriteriaVM): Observable<RevenuesVM> {
        return this.http.request<RevenuesVM>('post', this.url + '/buildRevenues', { body: criteria })
    }

}
