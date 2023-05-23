import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { EmbarkationListResolved } from './embarkation-list-resolved'
import { EmbarkationSearchCriteriaVM } from '../view-models/criteria/embarkation-search-criteria-vm'
import { EmbarkationHttpService } from '../services/embarkation.http.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'

@Injectable({ providedIn: 'root' })

export class EmbarkationListResolver {

    constructor(private embarkationService: EmbarkationHttpService, private sessionStorageService: SessionStorageService) { }

    resolve(): Observable<EmbarkationListResolved> {
        const storedCriteria = JSON.parse(this.sessionStorageService.getItem('embarkation-criteria'))
        const searchCriteria: EmbarkationSearchCriteriaVM = {
            date: storedCriteria.date,
            destinationIds: this.buildIds(storedCriteria.selectedDestinations),
            portIds: this.buildIds(storedCriteria.selectedPorts),
            shipIds: this.buildIds(storedCriteria.selectedShips)
        }
        return this.embarkationService.get(searchCriteria).pipe(
            map((ledgerList) => new EmbarkationListResolved(ledgerList)),
            catchError((err: any) => of(new EmbarkationListResolved(null, err)))
        )
    }

    private buildIds(criteria: any): number[] {
        const ids = []
        criteria.forEach((element: { id: any }) => {
            ids.push(parseInt(element.id))
        })
        return ids
    }

}
