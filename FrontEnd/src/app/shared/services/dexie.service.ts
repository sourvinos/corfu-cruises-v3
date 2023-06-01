import { Injectable } from '@angular/core'
import Dexie from 'dexie'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    private service: string

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

    public populateTable(table: string, service: any): void {
        service.getAll().subscribe((records: any) => {
            records.forEach((item: any) => {
                this.table(table).add({ 'id': item.id, 'description': item.description })
            })
        })
    }

}

export const db = new DexieService()