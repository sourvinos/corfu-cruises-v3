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

    public getBrowserStorage(discriminatorId: number): Observable<DocumentTypeAutoCompleteVM[]> {
        switch (discriminatorId) {
            case 1: return this.http.get<DocumentTypeAutoCompleteVM[]>(environment.apiUrl + '/documentTypes/getForBrowser' + 'Invoice')
            case 2: return this.http.get<DocumentTypeAutoCompleteVM[]>(environment.apiUrl + '/documentTypes/getForBrowser' + 'Receipt')
            case 3: return this.http.get<DocumentTypeAutoCompleteVM[]>(environment.apiUrl + '/documentTypes/getForBrowser' + 'Retail')
        }
    }

    public getLastDocumentTypeNo(id: number): Observable<any> {
        return this.http.request('get', this.url + '/getLastDocumentTypeNo/' + id)
    }

    public getLastDocumentTypeNoFromRetailSales(id: number): Observable<any> {
        return this.http.request('get', this.url + '/getLastDocumentTypeNoFromRetailSales/' + id)
    }

    //#endregion

}
