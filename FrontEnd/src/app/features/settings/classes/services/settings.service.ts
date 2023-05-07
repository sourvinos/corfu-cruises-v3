import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { Settings } from '../models/settings'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class SettingsService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/settings')
    }

    //#region public methods

    public get(): Observable<Settings> {
        return this.http.get<Settings>(environment.apiUrl + '/settings')
    }

    //#endregion

}