import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ShipRouteAutoCompleteVM } from '../view-models/shipRoute-autocomplete-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ShipRouteService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/shipRoutes')
    }

    //#region public methods

    public getAutoComplete(): Observable<ShipRouteAutoCompleteVM[]> {
        return this.http.get<ShipRouteAutoCompleteVM[]>(environment.apiUrl + '/shipRoutes/getAutoComplete')
    }

    //#endregion

}
