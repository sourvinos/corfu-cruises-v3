import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
// Custom
import { InteractionService } from '../../services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Menu } from '../../classes/menu'
import { ReservationSearchDialogComponent } from './reservation-search-dialog.component'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { TooltipService } from '../../services/tooltip.service'

@Component({
    selector: 'reservation-search',
    templateUrl: './reservation-search.component.html',
    styleUrls: ['./reservation-search.component.css']
})

export class ReservationSearchComponent {

    //#region variables

    public tooltipItems: Menu[]

    //#endregion

    constructor(private dialog: MatDialog, private interactionService: InteractionService, private localStorageService: LocalStorageService, private router: Router, private sessionStorageService: SessionStorageService, private tooltipService: TooltipService,) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onOpenDialog(): void {
        const dialogRef = this.dialog.open(ReservationSearchDialogComponent, {
            data: ['search-reservation'],
            panelClass: 'dialog',
            width: '32rem',
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.router.navigate(['reservations/refNo', result.refNo])
            }
        })
    }

    //#endregion

    //#region private methods

    private buildTooltips(): void {
        this.tooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToTooltipLanguageChanges()
        })
    }

    private createTooltips(items: Menu[]): void {
        this.tooltipItems = []
        items.forEach(item => {
            this.tooltipItems.push(item)
        })
    }

    private subscribeToTooltipLanguageChanges(): void {
        this.interactionService.refreshTooltips.subscribe(() => {
            this.buildTooltips()
        })
    }

    //#endregion

}
