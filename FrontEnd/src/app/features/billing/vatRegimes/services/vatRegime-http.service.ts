import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { VatRegimeAutoCompleteVM } from '../classes/view-models/vatRegime-autocomplete-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class VatRegimeService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/vatRegimes')
    }

    public getAutoComplete(): Observable<VatRegimeAutoCompleteVM[]> {
        return this.http.get<VatRegimeAutoCompleteVM[]>(environment.apiUrl + '/vatRegimes/getAutoComplete')
    }

}
