import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, NgZone } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'

@Component({
    selector: 'reservation-confirm-delete-range-dialog.component',
    templateUrl: './reservation-confirm-delete-range-dialog.component.html',
    styleUrls: ['./reservation-confirm-delete-range-dialog.component.css']
})

export class ReservationConfirmDeleteRangeDialogComponent {

    //#region variables

    private feature = 'delete-range-reservation'
    public form: FormGroup

    //#endregion

    constructor(private dialogRef: MatDialogRef<ReservationConfirmDeleteRangeDialogComponent>, private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private ngZone: NgZone) {
        this.feature = 'search-reservation'
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onSearch(): void {
        if (this.form.valid) {
            this.ngZone.run(() => {
                this.dialogRef.close(this.form.value)
            })
        }
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            randomString: ['', Validators.required]
        })
    }

    //#endregion

    //#region getters

    get randomString(): AbstractControl {
        return this.form.get('randomString')
    }

    //#endregion

}
