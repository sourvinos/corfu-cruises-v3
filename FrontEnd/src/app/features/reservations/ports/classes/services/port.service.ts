import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'
import { PortAutoCompleteVM } from '../view-models/port-autocomplete-vm'

@Injectable({ providedIn: 'root' })

export class PortService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/ports')
    }

    //#region public methods

    public getAutoComplete(): Observable<PortAutoCompleteVM[]> {
        return this.http.get<PortAutoCompleteVM[]>(environment.apiUrl + '/ports/getAutoComplete')
    }

    //#endregion

}