import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { StatisticsVM } from '../view-models/statistics-vm'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class StatisticsService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/statistics')
    }

    public getStatistics(year: number, table: string): Observable<StatisticsVM> {
        return this.http.get<StatisticsVM>(environment.apiUrl + '/statistics/' + table + '/year/' + year)
    }

}
