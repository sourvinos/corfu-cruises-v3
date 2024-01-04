import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ListResolved } from '../../../../../shared/classes/list-resolved'
import { CodeHttpService } from '../services/code-http.service'

@Injectable({ providedIn: 'root' })

export class CodeListResolver {

    constructor(private codeHttpService: CodeHttpService) { }

    resolve(): Observable<ListResolved> {
        return this.codeHttpService.getAll().pipe(
            map((codeList) => new ListResolved(codeList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
