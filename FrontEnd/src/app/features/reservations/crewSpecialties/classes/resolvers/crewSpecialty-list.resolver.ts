import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { CrewSpecialtyHttpService } from '../services/crewSpecialty-http.service'
import { ListResolved } from '../../../../../shared/classes/list-resolved'

@Injectable({ providedIn: 'root' })

export class CrewSpecialtyListResolver {

    constructor(private crewSpecialtyHttpService: CrewSpecialtyHttpService) { }

    resolve(): Observable<ListResolved> {
        return this.crewSpecialtyHttpService.getAll().pipe(
            map((crewSpecialtyList) => new ListResolved(crewSpecialtyList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
