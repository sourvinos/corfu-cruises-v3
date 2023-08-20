import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { ChangePasswordViewModel } from '../view-models/change-password-view-model'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'
import { UserNewDto } from '../dtos/new-user-dto'

@Injectable({ providedIn: 'root' })

export class UserService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/users')
    }

    //#region public methods

    public updatePassword(formData: ChangePasswordViewModel): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/users/changePassword/', formData)
    }

    public saveUser(formData: any): Observable<any> {
        return this.http.post<any>(this.url, formData)
    }

    public emailNewUserDetails(formData: UserNewDto): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/users/emailNewUserDetails/', formData)
    }


    //#endregion

}
