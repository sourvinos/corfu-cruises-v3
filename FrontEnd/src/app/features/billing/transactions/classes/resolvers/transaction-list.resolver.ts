import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ListResolved } from '../../../../../shared/classes/list-resolved'
import { TransactionHttpService } from '../services/transaction-http.service'

@Injectable({ providedIn: 'root' })

export class TransactionListResolver {

    constructor(private transactionHttpService: TransactionHttpService) { }

    resolve(): Observable<ListResolved> {
        return this.transactionHttpService.getAll()
            .pipe(
                map((invoiceList) => new ListResolved(invoiceList)),
                catchError((err: any) => of(new ListResolved(null, err)))
            )
    }

}
