import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { DestinationAutoCompleteVM } from '../view-models/destination-autocomplete-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class DestinationService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/destinations')
    }

    //#region public methods

    public getAutoComplete(): Observable<DestinationAutoCompleteVM[]> {
        return this.http.get<DestinationAutoCompleteVM[]>(environment.apiUrl + '/destinations/getAutoComplete')
    }

    //#endregion

}
