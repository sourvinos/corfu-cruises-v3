import { Injectable } from '@angular/core'
import Dexie from 'dexie'
import { CustomerHttpService } from 'src/app/features/reservations/customers/classes/services/customer-http.service'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('DexieDB')
        this.version(1).stores({
            coachRoutes: 'id, abbreviation, isActive',
            customers: 'id, abbreviation, description, isActive',
            destinations: 'id, description, isActive',
            documentTypes: 'id, abbreviation, description, batch, lastDate, lastNo, isMyData, table8_1, table8_8, table8_9, isActive',
            drivers: 'id, description, isActive',
            genders: 'id, description, isActive',
            nationalities: 'id, description, isActive',
            paymentMethods: 'id, description, myDataId, isActive',
            pickupPoints: 'id, description, isActive',
            ports: 'id, abbreviation, description, isActive',
            shipOwners: 'id, description, taxNo, branch, isActive',
            shipRoutes: 'id, description, isActive',
            ships: 'id, description, isActive',
            taxOffices: 'id, description, isActive',
            vatRegimes: 'id, description, isActive'
        })
        this.delete().then(() => this.open())
    }

    public populateTable(table: string, httpService: any): void {
        httpService.getAutoComplete().subscribe((records: any) => {
            this.table(table)
                .bulkAdd(records)
                .catch(Dexie.BulkError, () => { })
        })
    }

    public populateNewTable(table: string, customerHttpService: CustomerHttpService): void {
        customerHttpService.getBrowserStorage().subscribe((records: any) => {
            this.table(table)
                .bulkAdd(records)
                .catch(Dexie.BulkError, () => { })
        })
    }

    public async getById(table: string, id: number): Promise<any> {
        return await this.table(table).get({ id: id })
    }

    public getByKey(table: string, id: any): Promise<any> {
        return new Promise((resolve) => {
            this.table(table).get(id).then(response => {
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
