import { Component, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { DateRange, MatCalendar } from '@angular/material/datepicker'
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// Custom
import { ConnectedUser } from 'src/app/shared/classes/connected-user'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { EmojiService } from './../../../../shared/services/emoji.service'
import { FieldsetCriteriaService } from 'src/app/shared/services/fieldset-criteria.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LedgerCriteriaVM } from '../../classes/view-models/criteria/ledger-criteria-vm'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from './../../../../shared/classes/simple-entity'

@Component({
    selector: 'ledger-criteria',
    templateUrl: './ledger-criteria.component.html',
    styleUrls: ['../../../../../assets/styles/forms.css', './ledger-criteria.component.css']
})

export class LedgerCriteriaComponent {

    //#region variables

    @ViewChild('calendar', { static: false }) calendar: MatCalendar<Date>

    private unsubscribe = new Subject<void>()
    public feature = 'ledgerCriteria'
    public featureIcon = 'ledgers'
    public form: FormGroup
    public icon = 'home'
    public parentUrl = '/home'

    private criteria: LedgerCriteriaVM
    public selectedFromDate = new Date()
    public selectedRangeValue: DateRange<Date>
    public selectedToDate = new Date()
    public destinations: SimpleEntity[] = []
    public ports: SimpleEntity[] = []
    public ships: SimpleEntity[] = []

    public isAdmin = false

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private emojiService: EmojiService, private fieldsetCriteriaService: FieldsetCriteriaService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
        this.getConnectedUserRole()
        this.populateFieldsFromStoredVariables()
        this.setSelectedDates()
        this.setLocale()
        this.subscribeToInteractionService()
        this.setTabTitle()
    }

    ngAfterViewInit(): void {
        this.checkGroupCheckbox('all-destinations', this.destinations, 'destinations')
        this.checkGroupCheckbox('all-ports', this.ports, 'ports')
        this.checkGroupCheckbox('all-ships', this.ships, 'ships')
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public checkboxChange(event: any, allCheckbox: string, formControlsArray: string, array: any[], description: string): void {
        this.fieldsetCriteriaService.checkboxChange(this.form, event, allCheckbox, formControlsArray, array, description)
    }

    public doTasks(): void {
        this.storeCriteria()
        this.navigateToList()
    }

    public filterList(event: { target: { value: any } }, list: string | number): void {
        this.fieldsetCriteriaService.filterList(event.target.value, this[list])
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public gotoToday(): void {
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date()),
            toDate: this.dateHelperService.formatDateToIso(new Date())
        })
    }

    public lookup(arrayName: string, arrayId: number): boolean {
        if (this.criteria) {
            return this.criteria[arrayName].filter((x: { id: number }) => x.id == arrayId).length != 0 ? true : false
        }
    }

    public patchFormWithSelectedDates(fromDate: any, toDate: any): void {
        this.form.patchValue({
            fromDate: fromDate.value != null ? this.dateHelperService.formatDateToIso(new Date(fromDate.value)) : '',
            toDate: toDate.value != null ? this.dateHelperService.formatDateToIso(new Date(toDate.value)) : ''
        })
    }

    public toggleAllCheckboxes(form: FormGroup, array: string, allCheckboxes: string): void {
        this.fieldsetCriteriaService.toggleAllCheckboxes(form, array, allCheckboxes)
    }

    //#endregion

    //#region private methods

    private addSelectedCriteriaFromStorage(arrayName: string): void {
        const x = this.form.controls[arrayName] as FormArray
        this.criteria[arrayName].forEach((element: any) => {
            x.push(new FormControl({
                'id': element.id,
                'description': element.description
            }))
        })
    }

    private checkGroupCheckbox(allCheckbox: string, array: SimpleEntity[], formControlsArray: string): void {
        this.fieldsetCriteriaService.checkGroupCheckbox(this.form, allCheckbox, array, formControlsArray)
    }

    private cleanup(): void {
        this.unsubscribe.next()
        this.unsubscribe.unsubscribe()
    }

    public getConnectedUserRole(): void {
        this.isAdmin = ConnectedUser.isAdmin
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            fromDate: ['', [Validators.required]],
            toDate: ['', [Validators.required]],
            destinations: this.formBuilder.array([], Validators.required),
            ports: this.formBuilder.array([], Validators.required),
            ships: this.formBuilder.array([], Validators.required),
            destinationsFilter: '',
            portsFilter: '',
            shipsFilter: '',
            allDestinationsCheckbox: '',
            allPortsCheckbox: '',
            allShipsCheckbox: ''
        })
    }

    private navigateToList(): void {
        this.router.navigate(['ledgers/list'])
    }

    private populateDropdownFromLocalStorage(table: string): void {
        this[table] = JSON.parse(this.sessionStorageService.getItem(table))
    }

    private populateDropdowns(): void {
        this.populateDropdownFromLocalStorage('destinations')
        this.populateDropdownFromLocalStorage('ports')
        this.populateDropdownFromLocalStorage('ships')
    }

    private populateFieldsFromStoredVariables(): void {
        if (this.sessionStorageService.getItem('ledger-criteria')) {
            this.criteria = JSON.parse(this.sessionStorageService.getItem('ledger-criteria'))
            this.form.patchValue({
                fromDate: this.criteria.fromDate,
                toDate: this.criteria.toDate,
                destinations: this.addSelectedCriteriaFromStorage('destinations'),
                ports: this.addSelectedCriteriaFromStorage('ports'),
                ships: this.addSelectedCriteriaFromStorage('ships'),
                allDestinationsCheckbox: this.criteria.allDestinationsCheckbox,
                allPortsCheckbox: this.criteria.allPortsCheckbox,
                allShipsCheckbox: this.criteria.allShipsCheckbox
            })
        }
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setSelectedDates(): void {
        if (this.criteria != undefined) {
            this.selectedRangeValue = new DateRange(new Date(this.criteria.fromDate), new Date(this.criteria.toDate))
        } else {
            this.selectedRangeValue = new DateRange(new Date(), new Date())
            this.form.patchValue({
                fromDate: this.dateHelperService.formatDateToIso(new Date(), false),
                toDate: this.dateHelperService.formatDateToIso(new Date(), false),
            })
        }
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private storeCriteria(): void {
        this.sessionStorageService.saveItem('ledger-criteria', JSON.stringify(this.form.value))
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshDateAdapter.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.setLocale()
        })
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    //#endregion

    //#region getters

    get fromDate(): AbstractControl {
        return this.form.get('fromDate')
    }

    get toDate(): AbstractControl {
        return this.form.get('toDate')
    }

    //#endregion    

}
