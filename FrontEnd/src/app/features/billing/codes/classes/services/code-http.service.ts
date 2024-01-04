import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { CodeAutoCompleteVM } from '../view-models/code-autocomplete-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class CodeHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/codes')
    }

    //#region public methods

    public getAutoComplete(): Observable<CodeAutoCompleteVM[]> {
        return this.http.get<CodeAutoCompleteVM[]>(environment.apiUrl + '/codes/getAutoComplete')
    }

    //#endregion

}
