import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { EmailRetailSaleVM } from '../view-models/email/email-retailSale-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { RetailSaleListCriteriaVM } from '../view-models/criteria/retailSale-list-criteria-vm'
import { RetailSaleListVM } from '../view-models/list/retailSale-list-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class RetailSaleHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/retailSales')
    }

    public getForList(criteria: RetailSaleListCriteriaVM): Observable<RetailSaleListVM[]> {
        return this.http.request<RetailSaleListVM[]>('post', environment.apiUrl + '/retailSales/getForPeriod', { body: criteria })
    }

    public buildPdf(invoiceId: string): Observable<any> {
        return this.http.get<any>(this.url + '/buildInvoicePdf/' + invoiceId)
    }

    public emailRetailSale(criteria: EmailRetailSaleVM): Observable<any> {
        return this.http.request<EmailRetailSaleVM>('post', this.url + '/emailRetailSale', { body: criteria })
    }

    public patchRetailSaleWithEmailSent(invoiceId: string): Observable<any> {
        return this.http.patch<any>(this.url + '/patchRetailSaleWithEmailSent/' + invoiceId, null)
    }

    public openPdf(filename: string): Observable<any> {
        return this.http.get(this.url + '/openPdf/' + filename, { responseType: 'arraybuffer' })
    }

}
