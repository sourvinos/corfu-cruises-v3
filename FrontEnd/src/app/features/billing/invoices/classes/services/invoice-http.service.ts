import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { AadeVM } from '../view-models/form/aade-vm'
import { EmailInvoiceVM } from '../view-models/email/email-invoice-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { InvoiceLinkVM } from '../view-models/email/invoiceLink-vm'
import { InvoiceListCriteriaVM } from '../view-models/criteria/invoice-list-criteria-vm'
import { InvoiceListVM } from '../view-models/list/invoice-list-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class InvoiceHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/invoices')
    }

    public getForList(criteria: InvoiceListCriteriaVM): Observable<InvoiceListVM[]> {
        return this.http.request<InvoiceListVM[]>('post', environment.apiUrl + '/invoices/getForPeriod', { body: criteria })
    }

    public getForViewer(invoiceId: string): Observable<any> {
        return this.http.get(environment.apiUrl + '/invoicesViewer/' + invoiceId)
    }

    public validateCustomerData(customerId: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/customers/getByIdForValidation/' + customerId)
    }

    public override save(formData: any): Observable<any> {
        return formData.invoiceId == null
            ? this.http.post<any>(this.url, formData)
            : this.http.put<any>(this.url, formData)
    }

    public updateInvoiceAade(aadeVM: AadeVM): Observable<any> {
        return this.http.put<any>(this.url + '/invoiceAade', aadeVM)
    }

    public sendInvoiceLinkToEmail(invoiceId: string, email: string): any {
        const x: InvoiceLinkVM = {
            email: email,
            invoiceId: invoiceId
        }
        return this.http.post(this.url + '/sendInvoiceLinkToEmail', x)
    }

    public patchInvoiceWithEmailSent(invoiceId: string): Observable<any> {
        return this.http.patch<any>(this.url + '/email/' + invoiceId, null)
    }

    public patchInvoiceWithIsCancelled(invoiceId: string): Observable<any> {
        return this.http.patch<any>(this.url + '/isCancelled/' + invoiceId, null)
    }

    buildPdf(invoiceId: string): Observable<any> {
        return this.http.request<any>('get', this.url + '/buildInvoicePdf/' + invoiceId)
    }

    emailInvoice(criteria: EmailInvoiceVM): Observable<any> {
        return this.http.request<EmailInvoiceVM[]>('post', this.url + '/emailPdf', { body: criteria })
    }

}

