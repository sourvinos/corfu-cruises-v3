import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { CodeHttpService } from '../services/code-http.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'

@Injectable({ providedIn: 'root' })

export class CodeFormResolver {

    constructor(private codeHttpService: CodeHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.codeHttpService.getSingle(route.params.id).pipe(
            map((codeForm) => new FormResolved(codeForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
