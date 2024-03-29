import Dexie from 'dexie'
import { Injectable } from '@angular/core'
// Custom
import { CustomerHttpService } from 'src/app/features/reservations/customers/classes/services/customer-http.service'
import { DocumentTypeHttpService } from 'src/app/features/billing/documentTypes/classes/services/documentType-http.service'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('CorfuCruisesDB')
        this.version(1).stores({
            billingParameters: 'id',
            coachRoutes: 'id, abbreviation',
            crewSpecialties: 'id',
            customers: 'id, description',
            destinations: 'id, description',
            documentTypesInvoice: 'id, abbreviation',
            documentTypesReceipt: 'id, abbreviation',
            drivers: 'id, description',
            genders: 'id, description',
            nationalities: 'id, description',
            paymentMethods: 'id, description',
            pickupPoints: 'id, description',
            ports: 'id, description',
            shipOwners: 'id, description',
            shipRoutes: 'id',
            ships: 'id, description',
            taxOffices: 'id, description',
            vatRegimes: 'id, description',
            customersCriteria: 'id, description',
            destinationsCriteria: 'id, description',
            portsCriteria: 'id, description',
            shipsCriteria: 'id, description',
        })
        this.open()
    }

    public populateTable(table: string, httpService: any): void {
        httpService.getForBrowser().subscribe((records: any) => {
            this.table(table)
                .clear().then(() => {
                    this.table(table)
                        .bulkAdd(records)
                        .catch(Dexie.BulkError, () => { })
                })
        })
    }

    public populateCriteria(table: string, httpService: any): void {
        httpService.getForCriteria().subscribe((records: any) => {
            this.table(table)
                .clear().then(() => {
                    this.table(table)
                        .bulkAdd(records)
                        .catch(Dexie.BulkError, () => { })
                })
        })
    }

    public populateNewTable(table: string, customerHttpService: CustomerHttpService): void {
        customerHttpService.getBrowserStorage().subscribe((records: any) => {
            this.table(table)
                .clear().then(() => {
                    this.table(table)
                        .bulkAdd(records)
                        .catch(Dexie.BulkError, () => { })
                })
        })
    }

    public populateDocumentTypesTable(table: string, documentTypeHttpService: DocumentTypeHttpService, discriminatorId: number): void {
        documentTypeHttpService.getBrowserStorage(discriminatorId).subscribe((records: any) => {
            this.table(table)
                .clear().then(() => {
                    this.table(table)
                        .bulkAdd(records)
                        .catch(Dexie.BulkError, () => { })
                })
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
