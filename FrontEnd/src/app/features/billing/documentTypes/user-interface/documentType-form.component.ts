import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { DocumentTypeHelperService } from '../classes/services/docymentType-helper.service'
import { DocumentTypeHttpService } from '../classes/services/documentType-http.service'
import { DocumentTypeReadDto } from '../classes/dtos/documentType-read-dto'
import { DocumentTypeWriteDto } from '../classes/dtos/documentType-write-dto'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'documentType-form',
    templateUrl: './documentType-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class DocumentTypeFormComponent {

    //#region common #8

    private record: DocumentTypeReadDto
    private recordId: string
    public feature = 'documentTypeForm'
    public featureIcon = 'documentTypes'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/documentTypes'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private documentTypeHelperService: DocumentTypeHelperService, private documentTypeHttpService: DocumentTypeHttpService, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.subscribeToInteractionService()
        this.setLocale()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public getLastDate(): string {
        return this.form.value.lastDate
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.documentTypeHttpService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('documentTypes', this.form.value.id)
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public patchFormWithSelectedDate(event: any): void {
        this.form.patchValue({
            lastDate: event.value.date
        })
    }

    //#endregion

    //#region private methods

    private flattenForm(): DocumentTypeWriteDto {
        return {
            id: this.form.value.id != '' ? this.form.value.id : null,
            abbreviation: this.form.value.abbreviation,
            description: this.form.value.description,
            batch: this.form.value.batch,
            lastDate: this.dateHelperService.formatDateToIso(new Date(this.form.value.lastDate)),
            lastNo: this.form.value.lastNo,
            customers: this.form.value.customers,
            suppliers: this.form.value.suppliers,
            table8_1: this.form.value.table8_1,
            table8_8: this.form.value.table8_8,
            table8_9: this.form.value.table8_9,
            isMyData: this.form.value.isMyData,
            isActive: this.form.value.isActive,
            putAt: this.form.value.putAt
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['documentTypeForm']
                if (formResolved.error == null) {
                    this.record = formResolved.record.body
                    resolve(this.record)
                } else {
                    this.dialogService.open(this.messageDialogService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
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
            id: '',
            abbreviation: ['', [Validators.required, Validators.maxLength(5)]],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            batch: ['', [Validators.maxLength(5)]],
            lastDate: ['', [Validators.required, Validators.maxLength(10)]],
            lastNo: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
            isActive: true,
            customers: ['', [Validators.maxLength(1), ValidationService.shouldBeEmptyPlusOrMinus]],
            suppliers: ['', [Validators.maxLength(1), ValidationService.shouldBeEmptyPlusOrMinus]],
            isMyData: true,
            table8_1: ['', [Validators.maxLength(32)]],
            table8_8: ['', [Validators.maxLength(32)]],
            table8_9: ['', [Validators.maxLength(32)]],
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                abbreviation: this.record.abbreviation,
                description: this.record.description,
                batch: this.record.batch,
                lastDate: this.record.lastDate,
                lastNo: this.record.lastNo,
                isActive: this.record.isActive,
                customers: this.record.customers,
                suppliers: this.record.suppliers,
                isMyData: this.record.isMyData,
                table8_1: this.record.table8_1,
                table8_8: this.record.table8_8,
                table8_9: this.record.table8_9,
                postAt: this.record.postAt,
                postUser: this.record.postUser,
                putAt: this.record.putAt,
                putUser: this.record.putUser
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(documentType: DocumentTypeWriteDto): void {
        this.documentTypeHttpService.save(documentType).subscribe({
            next: (response) => {
                this.documentTypeHelperService.updateBrowserStorageAfterApiUpdate(response)
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.setLocale()
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

    //#region getters

    get abbreviation(): AbstractControl {
        return this.form.get('abbreviation')
    }

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get batch(): AbstractControl {
        return this.form.get('batch')
    }

    get lastDate(): AbstractControl {
        return this.form.get('lastDate')
    }

    get lastNo(): AbstractControl {
        return this.form.get('lastNo')
    }

    get customers(): AbstractControl {
        return this.form.get('customers')
    }

    get suppliers(): AbstractControl {
        return this.form.get('suppliers')
    }

    get table8_1(): AbstractControl {
        return this.form.get('table8_1')
    }

    get table8_8(): AbstractControl {
        return this.form.get('table8_8')
    }

    get table8_9(): AbstractControl {
        return this.form.get('table8_9')
    }

    get postAt(): AbstractControl {
        return this.form.get('postAt')
    }

    get postUser(): AbstractControl {
        return this.form.get('postUser')
    }

    get putAt(): AbstractControl {
        return this.form.get('putAt')
    }

    get putUser(): AbstractControl {
        return this.form.get('putUser')
    }

    //#endregion

}
