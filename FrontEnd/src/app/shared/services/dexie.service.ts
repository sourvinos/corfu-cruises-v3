import { Injectable } from '@angular/core'
import Dexie from 'dexie'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('DexieDB')
        this.delete()
        this.version(1).stores({
            coachRoutes: 'id, abbreviation',
            customers: 'id, description',
            destinations: 'id, description',
            drivers: 'id, description',
            genders: 'id, description',
            nationalities: 'id, description',
            pickupPoints: 'id, description',
            ports: 'id, description',
            shipOwners: 'id, description',
            shipRoutes: 'id, description',
            ships: 'id, description'
        })
        this.open()
    }

    public populateTable(table: string, httpService: any): void {
        httpService.getAutoComplete().subscribe((records: any) => {
            this.table(table).bulkAdd(records)
        })
    }

    public getById(table: string, id: any): Promise<any> {
        return new Promise((resolve) => {
            this.table(table).where({ id: id }).first().then(response => {
                resolve(response)
            })
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