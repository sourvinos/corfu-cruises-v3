import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ParametersReadDto } from '../models/parameters-read.dto'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ParametersService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/parameters')
    }

    //#region public methods

    public get(): Observable<ParametersReadDto> {
        return this.http.get<ParametersReadDto>(environment.apiUrl + '/parameters')
    }

    //#endregion

}
