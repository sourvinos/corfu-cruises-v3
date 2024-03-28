import { Injectable } from '@angular/core'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DocumentTypeBrowserStorageVM } from '../view-models/documentType-browser-storage-vm'

@Injectable({ providedIn: 'root' })

export class DocumentTypeHelperService {

    constructor(private dexieService: DexieService) { }

    public updateBrowserStorageAfterApiUpdate(table: string, response: any): void {
        const vm: DocumentTypeBrowserStorageVM = response.body
        this.dexieService.update(table, {
            'id': vm.id,
            'company': vm.companyId,
            'abbreviation': vm.abbreviation,
            'description': vm.description,
            'batch': vm.batch,
            'isActive': vm.isActive,
            'isMyData': vm.isMyData,
            'lastDate': vm.lastDate,
            'lastNo': vm.lastNo,
            'table8_1': vm.table8_1,
            'table8_8': vm.table8_8,
            'table8_9': vm.table8_9
        })
    }

}
