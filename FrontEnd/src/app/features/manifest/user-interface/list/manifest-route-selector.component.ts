import { Component, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
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

    constructor(private dialogRef: MatDialogRef<ManifestRouteSelectorComponent>, private dexieService: DexieService, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private ngZone: NgZone) { }

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
            this.dialogRef.close(this.form.value.shipRoute)
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

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('shipRoutes')
    }

    private populateDropdownFromDexieDB(table: string): void {
        this.dexieService.table(table).toArray().then((response) => {
            this[table] = response
        })
    }

    //#endregion

}
