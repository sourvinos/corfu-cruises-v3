import { Injectable } from '@angular/core'
// Custom
import { CustomerBrowserStorageVM } from '../view-models/customer-browser-storage-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'

@Injectable({ providedIn: 'root' })

export class CustomerHelperService {

    constructor(private dexieService: DexieService) { }

    public updateBrowserStorageAfterApiUpdate(response: any): void {
        const vm: CustomerBrowserStorageVM = response.body
        this.dexieService.update('customers', {
            'id': vm.id,
            'nationality': { 'id': vm.nationality.id, 'code': vm.nationality.code, 'description': vm.nationality.description, 'isActive': vm.nationality.isActive },
            'description': vm.description,
            'fullDescription': vm.fullDescription,
            'vatNumber': vm.vatNumber,
            'branch': vm.branch,
            'profession': vm.profession,
            'street': vm.street,
            'number': vm.number,
            'postalCode': vm.postalCode,
            'city': vm.city,
            'phones': vm.phones,
            'email': vm.email,
            'isActive': vm.isActive
        })
    }

}
