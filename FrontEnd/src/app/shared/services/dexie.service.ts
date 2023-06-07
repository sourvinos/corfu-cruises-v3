import { Injectable } from '@angular/core'
import Dexie from 'dexie'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('DexieDB')
        this.version(1).stores({
            coachRoutes: 'id, abbreviation',
            customers: 'id, description',
            destinations: 'id, description',
            drivers: 'id, description',
            genders: 'id, description',
            nationalities: 'id, code, description',
            pickupPoints: 'id, description, exactPoint, time',
            ports: 'id, description',
            shipOwners: 'id, description',
            shipRoutes: 'id, description',
            ships: 'id, description'
        })
        this.open()
    }

    public populateTable(table: string, httpService: any): void {
        httpService.getActive().subscribe((records: any) => {
            this.table(table).bulkAdd(records)
        })
    }

    public getById(table: string, id: any): any {
        this.table(table).where({ id: id }).first().then(response => {
            return response
        })
    }

    public update(table: string, item: any): void {
        this.table(table).put(item)
    }

    public remove(table: string, id: any): void {
        this.table(table).delete(id)
    }

}

export const db = new DexieService()