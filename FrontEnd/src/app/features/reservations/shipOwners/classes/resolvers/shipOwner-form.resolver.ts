import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { ShipOwnerHttpService } from '../services/shipOwner-http.service'

@Injectable({ providedIn: 'root' })

export class ShipOwnerFormResolver {

    constructor(private shipOwnerService: ShipOwnerHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.shipOwnerService.getSingle(route.params.id).pipe(
            map((shipOwnerForm) => new FormResolved(shipOwnerForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
