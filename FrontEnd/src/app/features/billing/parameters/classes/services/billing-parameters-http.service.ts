import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { BillingParametersReadDto } from '../models/billing-parameters-read.dto'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class BillingParametersHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/billingparameters')
    }

    //#region public methods

    public get(): Observable<BillingParametersReadDto> {
        return this.http.get<BillingParametersReadDto>(environment.apiUrl + '/billingparameters')
    }

    //#endregion

}
