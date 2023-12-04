import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, NgZone } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
// Custom
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'reservation-delete-range-dialog.component',
    templateUrl: './reservation-delete-range-dialog.component.html',
    styleUrls: ['./reservation-delete-range-dialog.component.css']
})

export class ReservationDeleteRangeDialogComponent {

    //#region variables

    private feature = 'delete-range-reservation'
    public form: FormGroup
    public shieldName: any
    public randomString: string
    public imgIsLoaded = false

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReservationDeleteRangeDialogComponent>, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private ngZone: NgZone) {
        this.shieldName = data
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.createRandomString()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getShieldIcon(): any {
        return environment.dialogShieldsDirectory + '/shield-' + this.shieldName + '.svg'
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    public onClose(): void {
        this.dialogRef.close()
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

    private createRandomString(): void {
        this.randomString = this.helperService.generateRandomString()
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            confirmationCode: ['', Validators.required]
        })
    }

    //#endregion

    //#region getters

    get confirmationCode(): AbstractControl {
        return this.form.get('confirmationCode')
    }

    //#endregion

}
