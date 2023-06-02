import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { DateRange } from '@angular/material/datepicker'
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageCalendarService } from 'src/app/shared/services/message-calendar.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { ScheduleService } from '../../classes/services/schedule.service'
import { ScheduleWriteVM } from '../../classes/form/schedule-write-vm'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'schedule-new',
    templateUrl: './schedule-new-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './schedule-new-form.component.css']
})

export class ScheduleNewFormComponent {

    //#region variables

    private subscription = new Subscription()
    public feature = 'scheduleCreateForm'
    public featureIcon = 'schedules'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public isAutoCompleteDisabled = true
    public parentUrl = '/schedules'

    public destinations: SimpleEntity[]
    public selectedDestinations: SimpleEntity[] = []
    public ports: SimpleEntity[]
    public selectedPorts: SimpleEntity[] = []
    public weekdays: SimpleEntity[]
    public selectedWeekdays: SimpleEntity[] = []

    public selectedRangeValue: DateRange<Date>
    public daysToCreate = []
    public selectedDays = []

    //#endregion

    constructor(private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageCalendarService: MessageCalendarService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private scheduleService: ScheduleService, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
        this.populateWeekdays()
        this.setSelectedDates()
        this.setLocale()
        this.subscribeToInteractionService()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public doTasks(event: any, x: string): void {
        if (event.target.classList.contains('p-checkbox-box')) {
            this.selectedDays.push(x)
        } else {
            this.selectedDays.splice(this.selectedDays.indexOf(x), 1)
        }
        this.buildDaysToCreate()
        this.updateFormFields()
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

    public getWeekday(id: string): string {
        return this.messageCalendarService.getDescription('weekdays', id)
    }

    public gotoToday(): void {
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date()),
            toDate: this.dateHelperService.formatDateToIso(new Date())
        })
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

    public onSave(): void {
        this.saveRecord()
    }

    public patchFormWithSelectedDates(fromDate: any, toDate: any): void {
        this.form.patchValue({
            fromDate: fromDate.value != null ? this.dateHelperService.formatDateToIso(new Date(fromDate.value)) : '',
            toDate: toDate.value != null ? this.dateHelperService.formatDateToIso(new Date(toDate.value)) : ''
        })
        this.buildDaysToCreate()
        this.updateFormFields()
    }

    //#endregion

    //#region private methods

    private buildPeriod(from: Date, to: Date): any {
        const period = []
        const currentDate = from
        while (currentDate <= to) {
            period.push(this.dateHelperService.getWeekdayIndex(this.dateHelperService.formatDateToIso(currentDate, false)) + ' ' + this.dateHelperService.formatDateToIso(currentDate, false))
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return period
    }

    private buildSchedule(): ScheduleWriteVM[] {
        const formValue = this.form.value
        const objects: ScheduleWriteVM[] = []
        this.form.value.daysToInsert.forEach((day: any) => {
            const x: ScheduleWriteVM = {
                id: formValue.id,
                destinationId: formValue.selectedDestinations[0].id,
                portId: formValue.selectedPorts[0].id,
                date: day,
                maxPax: formValue.maxPax,
                time: formValue.time,
                isActive: true
            }
            objects.push(x)
        })
        return objects
    }

    private cleanup(): void {
        this.subscription.unsubscribe()
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            selectedDestinations: this.formBuilder.array([], Validators.required),
            selectedPorts: this.formBuilder.array([], Validators.required),
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            daysToInsert: ['', Validators.required],
            maxPax: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            time: ['00:00', [Validators.required, ValidationService.isTime]],
        })
    }

    private populateDropdownFromLocalStorage(table: string): void {
        this[table] = JSON.parse(this.sessionStorageService.getItem(table))
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('destinations')
        this.populateDropdownFromDexieDB('ports')
    }

    private populateDropdownFromDexieDB(table: string): void {
        this.dexieService.table(table).toArray().then((response) => {
            this[table] = response
        })
    }

    private populateWeekdays(): void {
        this.weekdays = [
            { id: 0, description: this.messageCalendarService.getDescription('weekdays', '0') },
            { id: 1, description: this.messageCalendarService.getDescription('weekdays', '1') },
            { id: 2, description: this.messageCalendarService.getDescription('weekdays', '2') },
            { id: 3, description: this.messageCalendarService.getDescription('weekdays', '3') },
            { id: 4, description: this.messageCalendarService.getDescription('weekdays', '4') },
            { id: 5, description: this.messageCalendarService.getDescription('weekdays', '5') },
            { id: 6, description: this.messageCalendarService.getDescription('weekdays', '6') }
        ]
    }

    private saveRecord(): void {
        this.scheduleService.addRange(this.buildSchedule()).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setSelectedDates(): void {
        this.selectedRangeValue = new DateRange(new Date(), new Date())
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date(), false),
            toDate: this.dateHelperService.formatDateToIso(new Date(), false),
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.setLocale()
        })
    }

    private updateFormFields(): void {
        this.form.patchValue({
            daysToInsert: this.daysToCreate
        })
    }

    private buildDaysToCreate(): void {
        this.daysToCreate = []
        if (this.fromDate.valid && this.toDate.valid) {
            const period = this.buildPeriod(new Date(this.fromDate.value), new Date(this.toDate.value))
            if (this.selectedDays.length > 0) {
                period.forEach((day: string) => {
                    this.selectedWeekdays.forEach((x: any) => {
                        if (x.id == day.substring(0, 1)) {
                            this.daysToCreate.push(day.substring(2))
                        }
                    })
                })
            }
        }
    }

    //#endregion

    //#region getters

    get fromDate(): AbstractControl {
        return this.form.get('fromDate')
    }

    get toDate(): AbstractControl {
        return this.form.get('toDate')
    }

    get maxPax(): AbstractControl {
        return this.form.get('maxPax')
    }

    get time(): AbstractControl {
        return this.form.get('time')
    }

    //#endregion

}
