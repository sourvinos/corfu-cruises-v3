import { Injectable } from '@angular/core'
import Dexie from 'dexie'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('DexieDB')
        this.version(1).stores({
            coachRoutes: 'id, abbreviation, isActive',
            customers: 'id, description, isActive',
            destinations: 'id, description, isActive',
            drivers: 'id, description, isActive',
            genders: 'id, description, isActive',
            nationalities: 'id, description, isActive',
            pickupPoints: 'id, description, isActive',
            ports: 'id, abbreviation, description, isActive',
            shipOwners: 'id, description, isActive',
            shipRoutes: 'id, description, isActive',
            ships: 'id, description, isActive',
            taxOffices: 'id, description, isActive'
        })
        this.open()
    }

    public populateTable(table: string, httpService: any): void {
        httpService.getAutoComplete().subscribe((records: any) => {
            this.table(table)
                .bulkAdd(records)
                .catch(Dexie.BulkError, () => { })
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
