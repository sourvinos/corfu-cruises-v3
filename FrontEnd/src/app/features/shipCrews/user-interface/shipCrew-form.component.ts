import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { Component, Inject } from '@angular/core'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { GenderActiveVM } from '../../genders/classes/view-models/gender-active-vm'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { NationalityDropdownVM } from '../../nationalities/classes/view-models/nationality-dropdown-vm'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ShipActiveVM } from '../../ships/classes/view-models/ship-active-vm'
import { ShipCrewReadDto } from '../classes/dtos/shipCrew-read-dto'
import { ShipCrewService } from '../classes/services/shipCrew.service'
import { ShipCrewWriteDto } from '../classes/dtos/shipCrew-write-dto'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'ship-crew-form',
    templateUrl: './shipCrew-form.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css'],
})

export class ShipCrewFormComponent {

    //#region variables

    private record: ShipCrewReadDto
    private recordId: number
    private subscription = new Subscription()
    public feature = 'shipCrewForm'
    public featureIcon = 'shipCrews'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/shipCrews'

    public arrowIcon = new BehaviorSubject('arrow_drop_down')
    public dropdownGenders: Observable<GenderActiveVM[]>
    public dropdownNationalities: Observable<NationalityDropdownVM[]>
    public dropdownShips: Observable<ShipActiveVM[]>
    public isAutoCompleteDisabled = true

    public minBirthDate = new Date(new Date().getFullYear() - 99, 0, 1)

    //#endregion

    constructor(@Inject(MAT_DATE_LOCALE) private locale: string, private activatedRoute: ActivatedRoute, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private router: Router, private sessionStorageService: SessionStorageService, private shipCrewService: ShipCrewService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
        this.subscribeToInteractionService()
        this.setLocale()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    canDeactivate(): boolean {
        return this.helperService.goBackFromForm(this.form)
    }

    //#endregion

    //#region public methods

    public autocompleteFields(subject: { description: any }): any {
        return subject ? subject.description : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public convertFutureDateToPastDate(): void {
        this.form.patchValue({
            birthdate: this.dateHelperService.gotoPreviousCenturyIfFutureDate(this.form.value.birthdate)
        })
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
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

    public onDelete(): void {
        this.dialogService.open(this.messageSnackbarService.confirmDelete(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.shipCrewService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    //#endregion

    //#region private methods

    private cleanup(): void {
        this.subscription.unsubscribe()
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): ShipCrewWriteDto {
        return {
            id: this.form.value.id,
            shipId: this.form.value.ship.id,
            genderId: this.form.value.gender.id,
            nationalityId: this.form.value.nationality.id,
            lastname: this.form.value.lastname,
            firstname: this.form.value.firstname,
            birthdate: this.dateHelperService.formatDateToIso(new Date(this.form.value.birthdate)),
            isActive: this.form.value.isActive
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['shipCrewForm']
                if (formResolved.error == null) {
                    this.record = formResolved.record.body
                    resolve(this.record)
                } else {
                    this.dialogService.open(this.messageSnackbarService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
                        this.resetForm()
                        this.goBack()
                    })
                }
            })
        }
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            lastname: ['', [Validators.required, Validators.maxLength(128)]],
            firstname: ['', [Validators.required, Validators.maxLength(128)]],
            birthdate: ['', [Validators.required]],
            ship: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            nationality: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            gender: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            isActive: true,
            user: [''],
            lastUpdate: ['']
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('genders', 'dropdownGenders', 'gender', 'description', 'description')
        this.populateDropdownFromDexieDB('nationalities', 'dropdownNationalities', 'nationality', 'description', 'description')
        this.populateDropdownFromDexieDB('ships', 'dropdownShips', 'ship', 'description', 'description')
    }

    private populateDropdownFromDexieDB(table: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(table).orderBy(orderBy).toArray().then((response) => {
            this[table] = response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(table, modelProperty, value)))
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                lastname: this.record.lastname,
                firstname: this.record.firstname,
                birthdate: this.record.birthdate,
                ship: { 'id': this.record.ship.id, 'description': this.record.ship.description },
                nationality: { 'id': this.record.nationality.id, 'description': this.record.nationality.description },
                gender: { 'id': this.record.gender.id, 'description': this.record.gender.description },
                isActive: this.record.isActive,
                user: this.record.user,
                lastUpdate: this.record.lastUpdate
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(shipCrew: ShipCrewWriteDto): void {
        this.shipCrewService.save(shipCrew).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false)
            }
        })
    }

    private setLocale(): void {
        this.locale = this.localStorageService.getLanguage()
        this.dateAdapter.setLocale(this.locale)
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.setLocale()
        })
    }

    //#endregion

    //#region getters

    get lastname(): AbstractControl {
        return this.form.get('lastname')
    }

    get firstname(): AbstractControl {
        return this.form.get('firstname')
    }

    get birthdate(): AbstractControl {
        return this.form.get('birthdate')
    }

    get ship(): AbstractControl {
        return this.form.get('ship')
    }

    get nationality(): AbstractControl {
        return this.form.get('nationality')
    }

    get gender(): AbstractControl {
        return this.form.get('gender')
    }

    get user(): AbstractControl {
        return this.form.get('user')
    }

    get lastUpdate(): AbstractControl {
        return this.form.get('lastUpdate')
    }

    //#endregion

}
