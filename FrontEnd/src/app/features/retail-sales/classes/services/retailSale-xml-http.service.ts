import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class RetailSaleXmlHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/retailSalesXml')
    }

    public get(reservationId: string): Observable<any> {
        return this.http.get(this.url + '/' + reservationId)
    }

    public uploadInvoice(invoice: any): Observable<any> {
        return this.http.post<any>(this.url + '/uploadInvoice', invoice)
    }

    public cancelInvoice(invoice: any): Observable<any> {
        return this.http.post<any>(this.url + '/cancelInvoice', invoice)
    }

}

