import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { RetailSaleHttpService } from '../services/retailSale-http.service'

@Injectable({ providedIn: 'root' })

export class RetailSaleListResolver {

    constructor(private retailSaleHttpService: RetailSaleHttpService) { }

    resolve(): Observable<ListResolved> {
        return this.retailSaleHttpService.getAll().pipe(
            map((retailSaleList) => new ListResolved(retailSaleList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
