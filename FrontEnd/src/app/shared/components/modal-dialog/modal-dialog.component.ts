import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from '../../services/message-label.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.css']
})

export class ModalDialogComponent {

    //#region variables

    private feature = 'dialog'
    public content: any
    public shieldName: any
    public titleColor = ''
    public imgIsLoaded = false

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ModalDialogComponent>, private messageLabelService: MessageLabelService) {
        this.shieldName = data.iconStyle
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.content = this.data.message
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getShieldIcon(): any {
        return environment.dialogShieldsDirectory + '/shield-' + this.shieldName + '.svg'
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public isObject(): boolean {
        return typeof this.content === 'object'
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    public onClose(): void {
        this.dialogRef.close()
    }

    //#endregion

}
