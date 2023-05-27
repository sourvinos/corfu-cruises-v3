import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
// Custom
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'

@Injectable({ providedIn: 'root' })

export class DialogService {

    private response: any

    constructor(public dialog: MatDialog) { }

    //#region public methods

    public open(message: any, iconStyle: string, actions: string[]): Observable<boolean> {
        return this.openDialog(message, iconStyle, actions)
    }

    //#endregion

    //#region private methods

    private openDialog(message: string | object, iconStyle: string, actions: string[]): Observable<boolean> {
        this.response = this.dialog.open(DialogAlertComponent, {
            height: '30rem',
            width: '25rem',
            data: {
                message: message,
                iconStyle: iconStyle,
                actions: actions
            },
            panelClass: 'dialog'
        })
        return this.response.afterClosed()
    }

    //#endregion

}
