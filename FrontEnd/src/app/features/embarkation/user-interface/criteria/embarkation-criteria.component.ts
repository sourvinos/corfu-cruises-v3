import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { EmbarkationCriteriaPanelVM } from '../../classes/view-models/criteria/embarkation-criteria-panel-vm'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FieldsetCriteriaService } from 'src/app/shared/services/fieldset-criteria.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

@Component({
    selector: 'embarkation-criteria',
    templateUrl: './embarkation-criteria.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './embarkation-criteria.component.css']
})

export class EmbarkationCriteriaComponent {

    //#region variables

    private unsubscribe = new Subject<void>()
    public feature = 'embarkationCriteria'
    public featureIcon = 'embarkation'
    public form: FormGroup
    public icon = 'home'
    public parentUrl = '/home'

    private criteria: EmbarkationCriteriaPanelVM

    public destinations: SimpleEntity[] = []
    public ports: SimpleEntity[] = []
    public ships: SimpleEntity[] = []
    public selectedDestinations: SimpleEntity[] = []
    public selectedPorts: SimpleEntity[] = []
    public selectedShips: SimpleEntity[] = []

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private emojiService: EmojiService, private fieldsetCriteriaService: FieldsetCriteriaService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
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
            date: this.dateHelperService.formatDateToIso(new Date())
        })
    }

    public highlightRow(id: any): void {
        this.helperService.highlightRow(id)
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

    public patchFormWithSelectedDate(event: MatDatepickerInputEvent<Date>): void {
        this.form.patchValue({
            date: this.dateHelperService.formatDateToIso(new Date(event.value))
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

    private getToday(): string {
        return (this.dateHelperService.formatDateToIso(new Date()))
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            date: [this.getToday(), Validators.required],
            selectedDestinations: this.formBuilder.array([], Validators.required),
            selectedPorts: this.formBuilder.array([], Validators.required),
            selectedShips: this.formBuilder.array([], Validators.required),
        })
    }

    private navigateToList(): void {
        this.router.navigate(['embarkation/list'])
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
        if (this.sessionStorageService.getItem('embarkation-criteria')) {
            this.criteria = JSON.parse(this.sessionStorageService.getItem('embarkation-criteria'))
            this.form.patchValue({
                date: this.criteria.date,
                selectedDestinations: this.addSelectedCriteriaFromStorage('selectedDestinations'),
                selectedports: this.addSelectedCriteriaFromStorage('selectedPorts'),
                selectedships: this.addSelectedCriteriaFromStorage('selectedShips'),
            })
        }
    }

    private populateSelectedFromForm(): void {
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
        this.sessionStorageService.saveItem('embarkation-criteria', JSON.stringify(this.form.value))
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

    get date(): AbstractControl {
        return this.form.get('date')
    }

    //#endregion

}
