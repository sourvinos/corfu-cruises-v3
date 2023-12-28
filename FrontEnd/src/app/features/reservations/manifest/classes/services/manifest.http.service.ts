import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ManifestSearchCriteriaVM } from '../view-models/criteria/manifest-search-criteria-vm'
import { environment } from 'src/environments/environment'
import { ManifestVM } from '../view-models/list/manifest-vm'

@Injectable({ providedIn: 'root' })

export class ManifestService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/manifest')
    }

    get(criteria: ManifestSearchCriteriaVM): Observable<ManifestVM> {
        return this.http.request<ManifestVM>('post', this.url, { body: criteria })
    }

}
