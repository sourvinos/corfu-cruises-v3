import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, map, startWith } from 'rxjs'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { DocumentTypeAutoCompleteVM } from '../../../documentTypes/classes/view-models/documentType-autocomplete-vm'
import { DocumentTypeHttpService } from '../../../documentTypes/classes/services/documentType-http.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ReceiptHelperService } from '../../classes/services/receipt.helper.service'
import { ReceiptHttpService } from '../../classes/services/receipt-http.service'
import { ReceiptPdfHelperService } from '../../../receiptsViewer/classes/services/receipt-pdf-helper.service'
import { ReceiptPdfService } from '../../../receiptsViewer/classes/services/receipt-pdf.service'
import { ReceiptReadDto } from '../../classes/dtos/receipt-read-dto'
import { ReceiptWriteDto } from '../../classes/dtos/receipt-write-dto'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'receipt-form',
    templateUrl: './receipt-form.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './receipt-form.component.css']
})

export class ReceiptFormComponent {

    //#region common variables

    private record: ReceiptReadDto
    private recordId: string
    public feature = 'receiptForm'
    public featureIcon = 'receipts'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/receipts'

    //#endregion

    //#region specific variables

    public isNewRecord: boolean

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownCustomers: Observable<SimpleEntity[]>
    public dropdownDocumentTypes: Observable<DocumentTypeAutoCompleteVM[]>
    public dropdownPaymentMethods: Observable<SimpleEntity[]>
    public dropdownShipOwners: Observable<SimpleEntity[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private documentTypeHttpService: DocumentTypeHttpService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private receiptHelperService: ReceiptHelperService, private receiptHttpService: ReceiptHttpService, private receiptPdfService: ReceiptPdfService, private receiptPdfHelperService: ReceiptPdfHelperService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.updateFieldsAfterEmptyDocumentType()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getDate(): string {
        return this.form.value.date
    }

    public getTripDate(): string {
        return this.form.value.tripDate
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onCreatePdf(): void {
        this.receiptHttpService.getForViewer(this.form.value.invoiceId).subscribe(response => {
            this.receiptPdfHelperService.createPdfReceiptParts(response.body).then((response) => {
                this.receiptPdfService.createReport(response)
            })
        })
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.receiptHttpService.delete(this.form.value.invoiceId).subscribe({
                    complete: () => {
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

    public updateFieldsAfterDocumentTypeSelection(value: DocumentTypeAutoCompleteVM): void {
        this.form.patchValue({
            documentTypeDescription: value.description,
            invoiceNo: value.lastNo += 1,
            batch: value.batch
        })
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    public patchFormWithSelectedDate(event: any): void {
        this.form.patchValue({
            date: event.value.date
        })
    }

    public patchFormWithSelectedTripDate(event: any): void {
        this.form.patchValue({
            tripDate: event.value.date
        })
    }

    //#endregion

    //#region private methods

    private flattenForm(): ReceiptWriteDto {
        return this.receiptHelperService.flattenForm(this.form.value)
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['receiptForm']
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
            invoiceId: '',
            date: [new Date(), [Validators.required]],
            tripDate: [new Date(), [Validators.required]],
            customer: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentType: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            paymentMethod: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            shipOwner: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentTypeDescription: '',
            batch: '',
            invoiceNo: 0,
            grossAmount: [0, [Validators.required, Validators.min(1), Validators.max(99999)]],
            remarks: ['', Validators.maxLength(128)],
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: [''],
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customers', 'dropdownCustomers', 'customer', 'description', 'description')
        this.populateDropdownFromDexieDB('documentTypesReceipt', 'dropdownDocumentTypes', 'documentType', 'abbreviation', 'abbreviation')
        this.populateDropdownFromDexieDB('paymentMethods', 'dropdownPaymentMethods', 'paymentMethod', 'description', 'description')
        this.populateDropdownFromDexieDB('shipOwners', 'dropdownShipOwners', 'shipOwner', 'description', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = this.recordId == undefined ? response.filter(x => x.isActive) : response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.patchValue({
                invoiceId: this.record.invoiceId,
                date: this.record.date,
                tripDate: this.record.tripDate,
                shipOwner: { 'id': this.record.shipOwner.id, 'description': this.record.shipOwner.description },
                customer: { 'id': this.record.customer.id, 'description': this.record.customer.description },
                documentType: { 'id': this.record.documentType.id, 'abbreviation': this.record.documentType.abbreviation },
                documentTypeDescription: this.record.documentType.description,
                invoiceNo: this.record.invoiceNo,
                batch: this.record.documentType.batch,
                paymentMethod: { 'id': this.record.paymentMethod.id, 'description': this.record.paymentMethod.description },
                grossAmount: this.record.grossAmount,
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

    private saveRecord(receipt: ReceiptWriteDto): void {
        this.receiptHttpService.save(receipt).subscribe({
            next: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
            },
            error: (errorFromInterceptor: any) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string; }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private updateFieldsAfterEmptyDocumentType(): void {
        this.form.get('documentType').valueChanges.subscribe(value => {
            if (value == '') {
                this.form.patchValue({
                    documentTypeDescription: '',
                    invoiceNo: 0,
                    batch: ''
                })
            }
        })
    }

    private updateDocumentType(id: number): void {
        this.documentTypeHttpService.updateLastNo(id).subscribe({
            next: (response) => {
                this.receiptHelperService.updateBrowserStorageAfterApiUpdate(response.body)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    //#endregion

    //#region getters

    get date(): AbstractControl {
        return this.form.get('date')
    }

    get tripDate(): AbstractControl {
        return this.form.get('tripDate')
    }

    get shipOwner(): AbstractControl {
        return this.form.get('shipOwner')
    }

    get documentType(): AbstractControl {
        return this.form.get('documentType')
    }

    get lastNo(): AbstractControl {
        return this.form.get('lastNo')
    }

    get paymentMethod(): AbstractControl {
        return this.form.get('paymentMethod')
    }

    get customer(): AbstractControl {
        return this.form.get('customer')
    }

    get grossAmount(): AbstractControl {
        return this.form.get('grossAmount')
    }

    get remarks(): AbstractControl {
        return this.form.get('remarks')
    }

    //#endregion

}
