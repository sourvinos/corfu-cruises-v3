import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { DestinationHttpService } from '../services/destination-http.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'

@Injectable({ providedIn: 'root' })

export class DestinationFormResolver {

    constructor(private destinationService: DestinationHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.destinationService.getSingle(route.params.id).pipe(
            map((destinationForm) => new FormResolved(destinationForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
