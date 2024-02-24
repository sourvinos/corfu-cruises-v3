import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { CrewSpecialtyHttpService } from '../services/crewSpecialty-http.service'

@Injectable({ providedIn: 'root' })

export class CrewSpecialtyFormResolver {

    constructor(private crewSpecialtyHttpService: CrewSpecialtyHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.crewSpecialtyHttpService.getSingle(route.params.id).pipe(
            map((crewSpecialtyForm) => new FormResolved(crewSpecialtyForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
