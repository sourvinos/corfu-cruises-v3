import { Component, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ShipActiveVM } from '../../../ships/classes/view-models/ship-active-vm'

@Component({
    selector: 'reservation-to-ship-form',
    templateUrl: './reservation-to-ship-form.component.html',
    styleUrls: ['../../../../../assets/styles/material/mat-dialog.css', './reservation-to-ship-form.component.css']
})

export class ReservationToShipComponent {

    //#region variables

    private feature = 'assignToShip'
    public form: FormGroup
    public ships: ShipActiveVM[] = []

    //#endregion

    constructor(private dialogRef: MatDialogRef<ReservationToShipComponent>, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private ngZone: NgZone, private sessionStorageService: SessionStorageService) { }

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
            ship: ['', Validators.required]
        })
    }

    private populateDropdownFromLocalStorage(table: string): void {
        this[table] = JSON.parse(this.sessionStorageService.getItem(table))
    }

    private populateDropdowns(): void {
        this.populateDropdownFromLocalStorage('ships')
    }

    //#endregion

}
