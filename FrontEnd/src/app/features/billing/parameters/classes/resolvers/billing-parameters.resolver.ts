import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { BillingParametersHttpService } from '../services/billing-parameters-http.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'

@Injectable({ providedIn: 'root' })

export class BillingParametersResolver {

    constructor(private billingParametersHttpService: BillingParametersHttpService) { }

    resolve(): any {
        return this.billingParametersHttpService.getOnlyRecord().pipe(
            map((parametersForm) => new FormResolved(parametersForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
