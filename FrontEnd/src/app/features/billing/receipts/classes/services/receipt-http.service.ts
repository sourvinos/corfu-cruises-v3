import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ReceiptListCriteriaVM } from '../view-models/criteria/receipt-list-criteria-vm'
import { ReceiptListVM } from '../view-models/list/receipt-list-vm'
import { environment } from 'src/environments/environment'
import { EmailReceiptVM } from '../view-models/email/email-receipt-vm'

@Injectable({ providedIn: 'root' })

export class ReceiptHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/receipts')
    }

    public getForList(criteria: ReceiptListCriteriaVM): Observable<ReceiptListVM[]> {
        return this.http.request<ReceiptListVM[]>('post', environment.apiUrl + '/receipts/getForPeriod', { body: criteria })
    }

    public buildPdf(invoiceId: string): Observable<any> {
        return this.http.request<any>('get', this.url + '/buildReceiptPdf/' + invoiceId)
    }

    public openPdf(filename: string): Observable<any> {
        return this.http.get(this.url + '/openPdf/' + filename, { responseType: 'arraybuffer' })
    }

    public emailReceipt(criteria: EmailReceiptVM): Observable<any> {
        return this.http.request<EmailReceiptVM[]>('post', this.url + '/emailReceipt', { body: criteria })
    }

    public patchReceiptWithEmailSent(invoiceId: string): Observable<any> {
        return this.http.patch<any>(this.url + '/email/' + invoiceId, null)
    }

    public override save(formData: any): Observable<any> {
        return formData.invoiceId == null
            ? this.http.post<any>(this.url, formData)
            : this.http.put<any>(this.url, formData)
    }

}
