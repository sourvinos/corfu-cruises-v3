import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
// Custom
import { InteractionService } from '../../services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Menu } from '../../classes/menu'
import { MessageLabelService } from '../../services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { TooltipService } from '../../services/tooltip.service'

@Component({
    selector: 'search-reservation',
    templateUrl: './search-reservation.component.html',
    styleUrls: ['./search-reservation.component.css'],
})

export class SearchReservationComponent {

    //#region variables

    private feature = 'searchByRefBox'
    private isFormVisible: boolean
    public form: FormGroup
    public tooltipItems: Menu[]

    //#endregion

    constructor(private formBuilder: FormBuilder, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.hideForm()
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

    public onSearchByRefNo(): void {
        const refNo = this.form.value.searchByRefNo
        this.router.navigate(['reservations/refNo', refNo])
        this.hideForm()
    }

    public hideForm(): void {
        document.getElementById('form').style.visibility = 'hidden'
    }

    public showForm(): void {
        document.getElementById('form').style.visibility = 'visible'
    }

    public getFormIcon(): string {
        return this.isFormVisible == false || this.isFormVisible == undefined
            ? 'search'
            : 'close'
    }

    public getFormVisibility(): boolean {
        return this.isFormVisible
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

    private initForm(): void {
        this.form = this.formBuilder.group({
            searchByRefNo: ['', [Validators.required]],
        })
    }


    //#endregion

}
