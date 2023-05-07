import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { SettingsService } from '../services/settings.service'

@Injectable({ providedIn: 'root' })

export class SettingsResolver {

    constructor(private settingsService: SettingsService) { }

    resolve(): any {
        return this.settingsService.get().pipe(
            map((settings) => new FormResolved(settings)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
