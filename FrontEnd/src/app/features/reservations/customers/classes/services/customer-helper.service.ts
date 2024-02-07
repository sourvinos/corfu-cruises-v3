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
            'nationality': {
                'id': vm.nationality.id,
                'code': vm.nationality.code,
                'description': vm.nationality.description,
                'isActive': vm.nationality.isActive
            },
            'abbreviation': vm.abbreviation,
            'description': vm.description,
            'taxNo': vm.taxNo,
            'branch': vm.branch,
            'address': vm.address,
            'city': vm.city,
            'postalCode': vm.postalCode,
            'isActive': vm.isActive
        })
    }

}
