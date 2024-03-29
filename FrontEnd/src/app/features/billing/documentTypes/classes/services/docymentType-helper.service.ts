import { Injectable } from '@angular/core'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DocumentTypeBrowserStorageVM } from '../view-models/documentType-browser-storage-vm'

@Injectable({ providedIn: 'root' })

export class DocumentTypeHelperService {

    constructor(private dexieService: DexieService) { }

    public updateBrowserStorageAfterApiUpdate(table: string, response: any): void {
        const vm: DocumentTypeBrowserStorageVM = response
        this.dexieService.update(table, {
            'id': vm.id,
            'company': vm.companyId,
            'abbreviation': vm.abbreviation,
            'description': vm.description,
            'batch': vm.batch,
            'isActive': vm.isActive,
            'lastNo': vm.lastNo

        })
    }

}
