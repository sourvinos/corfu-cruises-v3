import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ShipOwnerAutoCompleteVM } from '../view-models/shipOwner-autocomplete-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ShipOwnerService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/shipOwners')
    }

    public getAutoComplete(): Observable<ShipOwnerAutoCompleteVM[]> {
        return this.http.get<ShipOwnerAutoCompleteVM[]>(environment.apiUrl + '/shipOwners/getAutoComplete')
    }

}
