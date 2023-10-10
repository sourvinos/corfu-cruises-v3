import { Component, EventEmitter, Input, Output } from '@angular/core'
// Custom
import { InteractionService } from '../../services/interaction.service'
import { Menu } from '../../classes/menu'
import { TooltipService } from '../../services/tooltip.service'

@Component({
    selector: 'year-selector',
    templateUrl: './year-selector.component.html',
    styleUrls: ['./year-selector.component.css']
})

export class YearSelectorComponent {

    //#region variables

    @Input() public year: string
    @Output() public yearEmitter = new EventEmitter()

    public menuItems: string[]
    public tooltipItems: Menu[]
    public years: string[]

    //#endregion

    constructor(private interactionService: InteractionService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.populateYears()
        this.buildMenu()
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(year: string): any {
        this.yearEmitter.emit(year)
    }

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    //#endregion

    //#region private methods

    private buildMenu(): void {
        this.menuItems = []
        this.years.forEach(item => {
            this.menuItems.push(item)
        })
    }

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

    private populateYears(): void {
        this.years = []
        for (let year = 2022; year < new Date().getFullYear() + 2; year++) {
            this.years.push(year.toString())
        }
    }

    private subscribeToTooltipLanguageChanges(): void {
        this.interactionService.refreshTooltips.subscribe(() => {
            this.buildTooltips()
        })
    }

    //#endregion

}
