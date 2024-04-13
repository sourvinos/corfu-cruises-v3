import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ReceiptHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/receipts')
    }

    public override save(formData: any): Observable<any> {
        return formData.invoiceId == null
            ? this.http.post<any>(this.url, formData)
            : this.http.put<any>(this.url, formData)
    }

    public getForViewer(invoiceId: string): Observable<any> {
        return this.http.get(environment.apiUrl + '/receiptsViewer/' + invoiceId)
    }

}
