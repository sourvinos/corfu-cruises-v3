import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { ParametersService } from '../services/parameters.service'

@Injectable({ providedIn: 'root' })

export class ParametersResolver {

    constructor(private parametersService: ParametersService) { }

    resolve(): any {
        return this.parametersService.get().pipe(
            map((parameters) => new FormResolved(parameters)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
