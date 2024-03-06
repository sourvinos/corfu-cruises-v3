import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { TransactionHttpService } from '../services/transaction-http.service'

@Injectable({ providedIn: 'root' })

export class TransactionFormResolver {

    constructor(private transactionHttpService: TransactionHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.transactionHttpService.getSingle(route.params.id).pipe(
            map((transactionForm) => new FormResolved(transactionForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
