import { Component, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ShipRouteActiveVM } from './../../../shipRoutes/classes/view-models/shipRoute-active-vm'

@Component({
    selector: 'manifest-route-selector',
    templateUrl: './manifest-route-selector.component.html',
    styleUrls: ['../../../../../assets/styles/material/mat-dialog.css', './manifest-route-selector.component.css']
})

export class ManifestRouteSelectorComponent {

    //#region variables

    private feature = 'manifestCriteria'
    public form: FormGroup
    public shipRoutes: ShipRouteActiveVM[] = []

    //#endregion

    constructor(private dialogRef: MatDialogRef<ManifestRouteSelectorComponent>, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private ngZone: NgZone, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
    }

    //#endregion

    //#region public methods

    public close(): void {
        this.dialogRef.close()
    }

    public continue(): void {
        this.ngZone.run(() => {
            const x = JSON.parse(this.sessionStorageService.getItem('shipRoutes'))
            const z = x.find((z: any) => z.id == this.form.value.shipRoute.id)
            this.dialogRef.close(z)
        })
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            shipRoute: ['', Validators.required]
        })
    }

    private populateDropdownFromLocalStorage(table: string): void {
        this[table] = JSON.parse(this.sessionStorageService.getItem(table))
    }

    private populateDropdowns(): void {
        this.populateDropdownFromLocalStorage('shipRoutes')
    }

    //#endregion

}
