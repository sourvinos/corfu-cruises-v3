import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { ChangePasswordViewModel } from '../view-models/change-password-view-model'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class UserService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/users')
    }

    //#region public methods

    public updatePassword(formData: ChangePasswordViewModel): Observable<any> {
        return this.http.post<any>(this.url + '/changePassword/', formData)
    }

    public saveUser(formData: any): Observable<any> {
        return this.http.post<any>(this.url, formData)
    }

    public emailUserDetails(email: string): Observable<any> {
        const body = JSON.stringify({ value: email })
        return this.http.post<any>(this.url + '/emailUserDetails', body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json', Accept: 'text/plain'
            })
        })
    }

    //#endregion

}
