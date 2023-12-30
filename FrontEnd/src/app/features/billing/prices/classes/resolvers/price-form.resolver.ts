import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { PriceService } from '../services/price-http.service'

@Injectable({ providedIn: 'root' })

export class PriceFormResolver {

    constructor(private priceService: PriceService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.priceService.getSingle(route.params.id).pipe(
            map((priceForm) => new FormResolved(priceForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
