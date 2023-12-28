import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ShipAutoCompleteVM } from '../view-models/ship-autocomplete-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ShipService extends HttpDataService {

    constructor(httpClient: HttpClient, private sessionStorageService: SessionStorageService) {
        super(httpClient, environment.apiUrl + '/ships')
    }

    //#region public methods

    getAutoComplete(): Observable<ShipAutoCompleteVM[]> {
        return this.http.get<ShipAutoCompleteVM[]>(environment.apiUrl + '/ships/getAutoComplete')
    }

    //#endregion

}
