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
            secondPorts: 'id, description',
            shipOwners: 'id, description',
            shipRoutes: 'id, description',
            ships: 'id, description',
            items: 'id,description'
        })
        this.open()
            .then(data => console.log(data))
            .catch(err => console.log(err.message))
    }

}

export const db = new DexieService()