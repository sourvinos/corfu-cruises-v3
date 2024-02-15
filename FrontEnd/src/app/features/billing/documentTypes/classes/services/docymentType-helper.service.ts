import { Injectable } from '@angular/core'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DocumentTypeBrowserStorageVM } from '../view-models/documentType-browser-storage-vm'

@Injectable({ providedIn: 'root' })

export class DocumentTypeHelperService {

    constructor(private dexieService: DexieService) { }

    public updateBrowserStorageAfterApiUpdate(response: any): void {
        const vm: DocumentTypeBrowserStorageVM = response.body
        this.dexieService.update('documentTypes', {
            'abbreviation': vm.abbreviation,
            'batch': vm.batch,
            'description': vm.description,
            'id': vm.id,
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
