import { Component } from '@angular/core'
import { DateRange } from '@angular/material/datepicker'
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { ScheduleService } from '../../classes/services/schedule.service'
import { ScheduleWriteVM } from '../../classes/form/schedule-write-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'schedule-new',
    templateUrl: './schedule-new-form.component.html',
    styleUrls: ['./schedule-new-form.component.css']
})

export class ScheduleNewFormComponent {

    //#region variables

    private subscription = new Subscription()
    public feature = 'scheduleCreateForm'
    public featureIcon = 'schedules'
    public form: FormGroup
    public icon = 'arrow_back'
    public parentUrl = '/schedules'

    public destinations: SimpleEntity[] = []
    public selectedDestinations: SimpleEntity[] = []
    public ports: SimpleEntity[] = []
    public selectedPorts: SimpleEntity[] = []
    public weekdays: SimpleEntity[] = []
    public selectedWeekdays: SimpleEntity[] = []

    public selectedRangeValue: DateRange<Date>
    public daysToCreate = []

    //#endregion

    constructor(private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogService: ModalDialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private scheduleService: ScheduleService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
        this.setSelectedDates()
        this.setTabTitle()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public doArrayTasks(event: SimpleEntity[], name: string): void {
        this.createFormControls(event, name)
        this.buildDaysToCreate()
        this.updateFormFields()
    }

    public doDateTasks(event: any): void {
        this.updateFormControls(event)
        this.buildDaysToCreate()
        this.updateFormFields()
    }

    public getDateRange(): any[] {
        const x = []
        x.push(this.form.value.fromDate)
        x.push(this.form.value.toDate)
        return x
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onSave(): void {
        this.saveRecord()
    }

    //#endregion

    //#region private methods

    private buildDaysToCreate(): void {
        this.daysToCreate = []
        if (this.fromDate.valid && this.toDate.valid) {
            const period = this.buildPeriod(new Date(this.fromDate.value), new Date(this.toDate.value))
            if (this.form.value.selectedWeekdays.length > 0) {
                period.forEach((day: string) => {
                    this.form.value.selectedWeekdays.forEach((x: any) => {
                        if (x.id == day.substring(0, 1)) {
                            this.daysToCreate.push(day.substring(2))
                        }
                    })
                })
            }
        }
    }

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

    private createFormControls(event: SimpleEntity[], name: string): void {
        const x = this.form.controls[name] as FormArray
        x.controls = []
        x.value.pop()
        this.form.patchValue({
            [name]: ['']
        })
        event.forEach(element => {
            x.push(new FormControl({
                'id': element.id,
                'description': element.description,
                'isActive': element.isActive
            }))
        })
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            selectedDestinations: this.formBuilder.array([], Validators.required),
            selectedPorts: this.formBuilder.array([], Validators.required),
            selectedWeekdays: this.formBuilder.array([], Validators.required),
            daysToInsert: ['', Validators.required],
            maxPax: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            time: ['00:00', [Validators.required, ValidationService.isTime]],
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('destinations', 'description')
        this.populateDropdownFromDexieDB('ports', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = response.filter(x => x.isActive)
        })
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

    private setSelectedDates(): void {
        this.selectedRangeValue = new DateRange(new Date(), new Date())
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date(), false),
            toDate: this.dateHelperService.formatDateToIso(new Date(), false),
        })
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private updateFormControls(event: any): void {
        this.form.patchValue({
            fromDate: this.dateHelperService.formatDateToIso(new Date(event.value.fromDate)),
            toDate: this.dateHelperService.formatDateToIso(new Date(event.value.toDate))
        })
    }

    private updateFormFields(): void {
        this.form.patchValue({
            daysToInsert: this.daysToCreate
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

    get maxPax(): AbstractControl {
        return this.form.get('maxPax')
    }

    get time(): AbstractControl {
        return this.form.get('time')
    }

    //#endregion

}
