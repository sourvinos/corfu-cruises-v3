import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { CustomerAutoCompleteVM } from '../view-models/customer-autocomplete-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class CustomerHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/customers')
    }

    //#region public methods

    public getAutoComplete(): Observable<CustomerAutoCompleteVM[]> {
        return this.http.get<CustomerAutoCompleteVM[]>(environment.apiUrl + '/customers/getAutoComplete')
    }

    //#endregion

}
