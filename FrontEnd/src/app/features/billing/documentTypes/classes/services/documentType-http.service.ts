import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { DocumentTypeAutoCompleteVM } from '../view-models/documentType-autocomplete-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class DocumentTypeHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/documentTypes')
    }

    //#region public methods

    public getAutoComplete(): Observable<DocumentTypeAutoCompleteVM[]> {
        return this.http.get<DocumentTypeAutoCompleteVM[]>(environment.apiUrl + '/documentTypes/getAutoComplete')
    }

    //#endregion

}