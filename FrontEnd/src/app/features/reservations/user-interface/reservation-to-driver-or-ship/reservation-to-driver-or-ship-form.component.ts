import { Component, Inject, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

@Component({
    selector: 'reservation-to-driver-or-ship-form',
    templateUrl: './reservation-to-driver-or-ship-form.component.html',
    styleUrls: ['../../../../../assets/styles/material/mat-dialog.css', './reservation-to-driver-or-ship-form.component.css']
})

export class ReservationToDriverOrShipComponent {

    //#region variables

    private feature: string
    private table: string
    public form: FormGroup
    public records: SimpleEntity[]

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReservationToDriverOrShipComponent>, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private ngZone: NgZone, private sessionStorageService: SessionStorageService) {
        this.table = data[0]
        this.feature = data[1]
    }

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

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public save(): void {
        this.ngZone.run(() => {
            this.dialogRef.close(this.form.value)
        })
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            record: ['', Validators.required]
        })
    }

    private populateDropdownFromLocalStorage(table: string): void {
        this.records = JSON.parse(this.sessionStorageService.getItem(table))
    }

    private populateDropdowns(): void {
        this.populateDropdownFromLocalStorage(this.table)
    }

    //#endregion

}
