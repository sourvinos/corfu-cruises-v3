import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { ReceiptListCriteriaVM } from '../view-models/criteria/receipt-list-criteria-vm'
import { ReceiptListVM } from '../view-models/list/receipt-list-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ReceiptHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/receipts')
    }

    public getForViewer(invoiceId: string): Observable<any> {
        return this.http.get(environment.apiUrl + '/receiptsViewer/' + invoiceId)
    }

    public getForList(criteria: ReceiptListCriteriaVM): Observable<ReceiptListVM[]> {
        return this.http.request<ReceiptListVM[]>('post', environment.apiUrl + '/receipts/getForPeriod', { body: criteria })
    }

}
