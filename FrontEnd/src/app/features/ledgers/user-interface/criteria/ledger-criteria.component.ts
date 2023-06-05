import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// Custom
import { ConnectedUser } from 'src/app/shared/classes/connected-user'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from './../../../../shared/services/emoji.service'
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
    styleUrls: ['../../../../../assets/styles/custom/fieldset-criteria.css']
})

export class LedgerCriteriaComponent {

    //#region variables

    private unsubscribe = new Subject<void>()
    public feature = 'ledgerCriteria'
    public featureIcon = 'ledgers'
    public form: FormGroup
    public icon = 'home'
    public parentUrl = '/home'

    private criteria: LedgerCriteriaVM
    public customers: SimpleEntity[] = []
    public destinations: SimpleEntity[] = []
    public ports: SimpleEntity[] = []
    public ships: SimpleEntity[] = []
    public selectedCustomers: SimpleEntity[] = []
    public selectedDestinations: SimpleEntity[] = []
    public selectedPorts: SimpleEntity[] = []
    public selectedShips: SimpleEntity[] = []

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
        this.getConnectedUserRole()
        this.populateFieldsFromStoredVariables()
        this.populateSelectedFromForm()
        this.setLocale()
        this.subscribeToInteractionService()
        this.setTabTitle()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public doTasks(): void {
        this.storeCriteria()
        this.navigateToList()
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

    public isAdmin(): boolean {
        return ConnectedUser.isAdmin
    }

    public onHeaderCheckboxToggle(event: any, array: string, formControl: string): void {
        if (event.checked == true) {
            const x = this.form.controls[formControl] as FormArray
            x.controls = []
            this.form.patchValue({
                [formControl]: []
            })
            this[array].forEach((element: any) => {
                x.push(new FormControl({
                    'id': element.id,
                    'description': element.description
                }))
            })
        }
        if (event.checked == false) {
            const x = this.form.controls[formControl] as FormArray
            x.controls = []
            this.form.patchValue({
                [formControl]: []
            })
        }
    }

    public onRowSelect(event: any, formControl: string): void {
        const x = this.form.controls[formControl] as FormArray
        x.controls = []
        this[formControl].forEach((element: any) => {
            x.push(new FormControl({
                'id': element.id,
                'description': element.description
            }))
        })
    }

    public onRowUnselect(event: any, formControl: string): void {
        const x = this.form.controls[formControl] as FormArray
        x.controls = []
        this.form.patchValue({
            [formControl]: []
        })
        this[formControl].forEach((element: any) => {
            x.push(new FormControl({
                'id': element.id,
                'description': element.description
            }))
        })
    }

    public patchFormWithSelectedDates(fromDate: any, toDate: any): void {
        this.form.patchValue({
            fromDate: fromDate.value != null ? this.dateHelperService.formatDateToIso(new Date(fromDate.value)) : '',
            toDate: toDate.value != null ? this.dateHelperService.formatDateToIso(new Date(toDate.value)) : ''
        })
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

    private cleanup(): void {
        this.unsubscribe.next()
        this.unsubscribe.unsubscribe()
    }

    public getConnectedUserRole(): boolean {
        return ConnectedUser.isAdmin
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            fromDate: ['', [Validators.required]],
            toDate: ['', [Validators.required]],
            selectedCustomers: this.formBuilder.array([], ConnectedUser.isAdmin ? Validators.required : null),
            selectedDestinations: this.formBuilder.array([], Validators.required),
            selectedPorts: this.formBuilder.array([], Validators.required),
            selectedShips: this.formBuilder.array([], Validators.required)
        })
    }

    private navigateToList(): void {
        this.router.navigate(['ledgers/list'])
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customers')
        this.populateDropdownFromDexieDB('destinations')
        this.populateDropdownFromDexieDB('ports')
        this.populateDropdownFromDexieDB('ships')
    }

    private populateDropdownFromDexieDB(table: string): void {
        this.dexieService.table(table).toArray().then((response) => {
            this[table] = response
        })
    }

    private populateFieldsFromStoredVariables(): void {
        if (this.sessionStorageService.getItem('ledger-criteria')) {
            this.criteria = JSON.parse(this.sessionStorageService.getItem('ledger-criteria'))
            this.form.patchValue({
                fromDate: this.criteria.fromDate,
                toDate: this.criteria.toDate,
                selectedCustomers: this.addSelectedCriteriaFromStorage('selectedCustomers'),
                selectedDestinations: this.addSelectedCriteriaFromStorage('selectedDestinations'),
                selectedPorts: this.addSelectedCriteriaFromStorage('selectedPorts'),
                selectedShips: this.addSelectedCriteriaFromStorage('selectedShips')
            })
        }
    }

    private populateSelectedFromForm(): void {
        this.selectedCustomers = this.form.value.selectedCustomers
        this.selectedDestinations = this.form.value.selectedDestinations
        this.selectedPorts = this.form.value.selectedPorts
        this.selectedShips = this.form.value.selectedShips
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
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
