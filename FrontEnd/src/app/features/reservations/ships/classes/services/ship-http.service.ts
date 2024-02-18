import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ShipAutoCompleteVM } from '../view-models/ship-autocomplete-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ShipHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/ships')
    }

    //#region public methods

    getAutoComplete(): Observable<ShipAutoCompleteVM[]> {
        return this.http.get<ShipAutoCompleteVM[]>(environment.apiUrl + '/ships/getForBrowserStorage')
    }

    //#endregion

}
