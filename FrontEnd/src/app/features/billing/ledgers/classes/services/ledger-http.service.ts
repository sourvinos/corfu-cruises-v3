import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'
import { LedgerVM } from '../view-models/criteria/ledger-vm'
import { Observable } from 'rxjs'
import { LedgerCriteriaVM } from '../view-models/criteria/ledger-criteria-vm'

@Injectable({ providedIn: 'root' })

export class LedgerHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/ledgersbilling')
    }

    get(criteria: LedgerCriteriaVM): Observable<LedgerVM[]> {
        return this.http.request<LedgerVM[]>('post', this.url, { body: criteria })
    }

}
