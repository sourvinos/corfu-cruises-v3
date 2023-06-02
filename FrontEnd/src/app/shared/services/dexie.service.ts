import { Injectable } from '@angular/core'
import Dexie from 'dexie'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('DexieDB')
        this.delete()
        this.version(1).stores({
            coachRoutes: 'id, description',
            customers: 'id, description',
            destinations: 'id, description',
            drivers: 'id, description',
            genders: 'id, description',
            nationalities: 'id, code, description',
            pickupPoints: 'id, description, exactPoint, time, port, port.id, port.description',
            ports: 'id, description',
            shipOwners: 'id, description',
            shipRoutes: 'id, description',
            ships: 'id, description'
        })
        this.open()
            .then(data => console.log(data))
            .catch(err => console.log(err.message))
    }

    public populateTable(table: string, httpService: any, objectKeys: any[]): void {
        const object = {}
        httpService.getActive().subscribe((records: any) => {
            records.forEach((record: any) => {
                objectKeys.forEach((key) => {
                    object[key] = record[key]
                })
                this.table(table).add(object)
            })
        })
    }

}

export const db = new DexieService()