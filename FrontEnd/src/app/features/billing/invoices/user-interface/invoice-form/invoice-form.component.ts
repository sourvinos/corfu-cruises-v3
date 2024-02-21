import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, map, startWith } from 'rxjs'
// Custom
import { AadeVM } from '../../classes/view-models/form/aade-vm'
import { BillingCriteriaVM } from '../../classes/view-models/form/billing-criteria-vm'
import { CustomerAutoCompleteVM } from 'src/app/features/reservations/customers/classes/view-models/customer-autocomplete-vm'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DestinationAutoCompleteVM } from 'src/app/features/reservations/destinations/classes/view-models/destination-autocomplete-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { DocumentTypeAutoCompleteVM } from '../../../documentTypes/classes/view-models/documentType-autocomplete-vm'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InvoiceHelperService } from '../../classes/services/invoice.helper.service'
import { InvoiceHttpService } from '../../classes/services/invoice-http.service'
import { InvoicePdfHelperService } from '../../classes/services/invoice-pdf-helper.service'
import { InvoicePdfService } from '../../classes/services/invoice-pdf.service'
import { InvoiceReadDto } from '../../classes/dtos/form/invoice-read-dto'
import { InvoiceWriteDto } from '../../classes/dtos/form/invoice-write-dto'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PortAutoCompleteVM } from 'src/app/features/reservations/ports/classes/view-models/port-autocomplete-vm'
import { PriceHttpService } from '../../../prices/classes/services/price-http.service'
import { ShipAutoCompleteVM } from './../../../../reservations/ships/classes/view-models/ship-autocomplete-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'
import { InvoiceXmlHelperService } from '../../classes/services/invoice-xml-helper.service'

@Component({
    selector: 'invoice-form',
    templateUrl: './invoice-form.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './invoice-form.component.css']
})

export class InvoiceFormComponent {

    //#region common variables

    private record: InvoiceReadDto
    private recordId: string
    public feature = 'invoiceForm'
    public featureIcon = 'invoices'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/invoices'

    //#endregion

    //#region specific variables

    public isNewRecord: boolean
    public isInvoiceTabVisible = true
    public isPortsTabVisible = false

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownCustomers: Observable<CustomerAutoCompleteVM[]>
    public dropdownDestinations: Observable<DestinationAutoCompleteVM[]>
    public dropdownDocumentTypes: Observable<DocumentTypeAutoCompleteVM[]>
    public dropdownPaymentMethods: Observable<SimpleEntity[]>
    public dropdownPorts: Observable<PortAutoCompleteVM[]>
    public dropdownShips: Observable<ShipAutoCompleteVM[]>

    //#endregion

    constructor(private invoicePdfService: InvoicePdfService, private invoicePdfHelperService: InvoicePdfHelperService, private invoiceXmlHelperService: InvoiceXmlHelperService, private dateHelperService: DateHelperService, private priceHttpService: PriceHttpService, private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private invoiceHelperService: InvoiceHelperService, private invoiceHttpService: InvoiceHttpService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.updateFieldsAfterEmptyDocumentType()
        this.setRecordId()
        this.getRecord()
        // this.populateFields()
        this.populateDropdowns()
        this.isInvoiceTabVisible = true
        this.isPortsTabVisible = false
        // this.addPorts()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public onDoCalculationTasks(): void {
        this.patchFormWithCalculations(
            this.calculatePortA(),
            this.calculatePortB(),
            this.calculatePortTotals())
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getDate(): string {
        return this.form.value.date
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
                // this.reservationService.delete(this.form.value.reservationId).subscribe({
                //     complete: () => {
                //         this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                //         this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                //         this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
                //     },
                //     error: (errorFromInterceptor) => {
                //         this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                //     }
                // })
            }
        })
    }

    public onDoNothing(): void {
        this.dialogService.open(this.messageDialogService.featureNotAvailable(), 'error', ['ok'])
    }

    public onDoPaxCalculations(): void {
        // TODO
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public getInvoiceTabVisibility(): boolean {
        return this.isInvoiceTabVisible
    }

    public getPortsTabVisibility(): boolean {
        return this.isPortsTabVisible
    }

    public onShowPortsTab(): void {
        this.isInvoiceTabVisible = false
        this.isPortsTabVisible = true
    }

    public onShowInvoiceTab(): void {
        this.isInvoiceTabVisible = true
        this.isPortsTabVisible = false
    }

    public onDoSubmitTasks(): void {
        this.invoiceXmlHelperService.createXmlInvoiceParts(this.form.value).then((response) => {
            this.invoiceHttpService.upload(this.invoiceXmlHelperService.createXmlInvoiceFromParts(response)).subscribe({
                next: (response) => {
                    const document = new DOMParser().parseFromString(response.body.response, 'text/xml')
                    const uId = document.querySelector('invoiceUid').innerHTML
                    const mark = document.querySelector('invoiceMark').innerHTML
                    const qrUrl = document.querySelector('qrUrl').innerHTML
                    const x: AadeVM = {
                        invoiceId: response.body.invoiceId,
                        uId: uId,
                        mark: mark,
                        markCancel: '',
                        qrUrl: qrUrl
                    }
                    this.invoiceHttpService.updateInvoiceAade(x).subscribe({
                        next: () => {
                            this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                        },
                        error: (errorFromInterceptor) => {
                            this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                        }
                    })
                },
                error: (errorFromInterceptor) => {
                    this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                }
            })
        })
    }

    public updateFieldsAfterDocumentTypeSelection(value: DocumentTypeAutoCompleteVM): void {
        this.form.patchValue({
            documentTypeDescription: value.description,
            no: value.lastNo,
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

    public onCreatePdf(): void {
        this.invoicePdfHelperService.createPdfInvoiceParts(this.form.value).then((response) => {
            this.invoicePdfService.createReport(response)
        })
    }

    public onUpdateInvoiceWithOutputPort(port: any, portIndex: number): void {
        this.form.value.invoicesPorts[portIndex] = port
    }

    public onUpdateInvoiceWithOutputPorts(ports: any): void {
        const grossAmount = ports.amount
        const vatPercent = parseFloat(this.form.value.vatPercent) / 100
        const netAmount = grossAmount / (1 + vatPercent)
        const vatAmount = netAmount * vatPercent
        this.form.patchValue({
            netAmount: netAmount.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            grossAmount: grossAmount.toFixed(2)
        })
    }

    //#endregion

    //#region private methods

    private calculatePortA(): any {
        const adults_A_AmountWithTransfer = this.form.value.portA.adults_A_WithTransfer * this.form.value.portA.adults_A_PriceWithTransfer
        const adults_A_AmountWithoutTransfer = this.form.value.portA.adults_A_WithoutTransfer * this.form.value.portA.adults_A_PriceWithoutTransfer
        const kids_A_AmountWithTransfer = this.form.value.portA.kids_A_WithTransfer * this.form.value.portA.kids_A_PriceWithTransfer
        const kids_A_AmountWithoutTransfer = this.form.value.portA.kids_A_WithoutTransfer * this.form.value.portA.kids_A_PriceWithoutTransfer
        const total_A_Persons = this.form.value.portA.adults_A_WithTransfer + this.form.value.portA.adults_A_WithoutTransfer + this.form.value.portA.kids_A_WithTransfer + this.form.value.portA.kids_A_WithoutTransfer + this.form.value.portA.free_A_WithTransfer + this.form.value.portA.free_A_WithoutTransfer
        const total_A_Amount = adults_A_AmountWithTransfer + adults_A_AmountWithoutTransfer + kids_A_AmountWithTransfer + kids_A_AmountWithoutTransfer
        return {
            adults_A_AmountWithTransfer,
            adults_A_AmountWithoutTransfer,
            kids_A_AmountWithTransfer,
            kids_A_AmountWithoutTransfer,
            total_A_Persons,
            total_A_Amount
        }
    }

    private calculatePortB(): any {
        const adults_B_AmountWithTransfer = this.form.value.portB.adults_B_WithTransfer * this.form.value.portB.adults_B_PriceWithTransfer
        const adults_B_AmountWithoutTransfer = this.form.value.portB.adults_B_WithoutTransfer * this.form.value.portB.adults_B_PriceWithoutTransfer
        const kids_B_AmountWithTransfer = this.form.value.portB.kids_B_WithTransfer * this.form.value.portB.kids_B_PriceWithTransfer
        const kids_B_AmountWithoutTransfer = this.form.value.portB.kids_B_WithoutTransfer * this.form.value.portB.kids_B_PriceWithoutTransfer
        const total_B_Persons = this.form.value.portB.adults_B_WithTransfer + this.form.value.portB.adults_B_WithoutTransfer + this.form.value.portB.kids_B_WithTransfer + this.form.value.portB.kids_B_WithoutTransfer + this.form.value.portB.free_B_WithTransfer + this.form.value.portB.free_B_WithoutTransfer
        const total_B_Amount = adults_B_AmountWithTransfer + adults_B_AmountWithoutTransfer + kids_B_AmountWithTransfer + kids_B_AmountWithoutTransfer
        return {
            adults_B_AmountWithTransfer,
            adults_B_AmountWithoutTransfer,
            kids_B_AmountWithTransfer,
            kids_B_AmountWithoutTransfer,
            total_B_Persons,
            total_B_Amount
        }
    }

    private calculatePortTotals(): any {
        const adultsWithTransfer = this.form.value.portA.adults_A_WithTransfer + this.form.value.portB.adults_B_WithTransfer
        const adultsAmountWithTransfer = this.form.value.portA.adults_A_AmountWithTransfer + this.form.value.portB.adults_B_AmountWithTransfer
        const adultsWithoutTransfer = this.form.value.portA.adults_A_WithoutTransfer + this.form.value.portB.adults_B_WithoutTransfer
        const adultsAmountWithoutTransfer = this.form.value.portA.adults_A_AmountWithoutTransfer + this.form.value.portB.adults_B_AmountWithoutTransfer
        const kidsWithTransfer = this.form.value.portA.kids_A_WithTransfer + this.form.value.portB.kids_B_WithTransfer
        const kidsAmountWithTransfer = this.form.value.portA.kids_A_AmountWithTransfer + this.form.value.portB.kids_B_AmountWithTransfer
        const kidsWithoutTransfer = this.form.value.portA.kids_A_WithoutTransfer + this.form.value.portB.kids_B_WithoutTransfer
        const kidsAmountWithoutTransfer = this.form.value.portA.kids_A_AmountWithoutTransfer + this.form.value.portB.kids_B_AmountWithoutTransfer
        const freeWithTransfer = this.form.value.portA.free_A_WithTransfer + this.form.value.portB.free_B_WithTransfer
        const freeWithoutTransfer = this.form.value.portA.free_A_WithoutTransfer + this.form.value.portB.free_B_WithoutTransfer
        const totalPersons = adultsWithTransfer + adultsWithoutTransfer + kidsWithTransfer + kidsWithoutTransfer + freeWithTransfer + freeWithoutTransfer
        const totalAmount =
            (this.form.value.portA.adults_A_WithTransfer * this.form.value.portA.adults_A_PriceWithTransfer) + (this.form.value.portB.adults_B_WithTransfer * this.form.value.portB.adults_B_PriceWithTransfer) +
            (this.form.value.portA.adults_A_WithoutTransfer * this.form.value.portA.adults_A_PriceWithoutTransfer) + (this.form.value.portB.adults_B_WithoutTransfer * this.form.value.portB.adults_B_PriceWithoutTransfer) +
            (this.form.value.portA.kids_A_WithTransfer * this.form.value.portA.kids_A_PriceWithTransfer) + (this.form.value.portB.kids_B_WithTransfer * this.form.value.portB.kids_B_PriceWithTransfer) +
            (this.form.value.portA.kids_A_WithoutTransfer * this.form.value.portA.kids_A_PriceWithoutTransfer) + (this.form.value.portB.kids_B_WithoutTransfer * this.form.value.portB.kids_B_PriceWithoutTransfer)
        return {
            adultsWithTransfer,
            adultsAmountWithTransfer,
            adultsWithoutTransfer,
            adultsAmountWithoutTransfer,
            kidsWithTransfer,
            kidsAmountWithTransfer,
            kidsWithoutTransfer,
            kidsAmountWithoutTransfer,
            freeWithTransfer,
            freeWithoutTransfer,
            totalPersons,
            totalAmount
        }
    }

    private flattenForm(): InvoiceWriteDto {
        return this.invoiceHelperService.flattenForm(this.form.value)
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['invoiceForm']
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
            date: ['', [Validators.required]],
            customer: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            destination: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentType: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentTypeDescription: '',
            batch: '',
            no: 0,
            paymentMethod: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            ship: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            netAmount: [0, ValidationService.isGreaterThanZero],
            vatPercent: [24, ValidationService.isGreaterThanZero],
            vatAmount: [0, ValidationService.isGreaterThanZero],
            grossAmount: [0, [Validators.required, Validators.min(1), Validators.max(99999)]],
            portA: this.formBuilder.group({
                id: 0,
                invoiceId: '',
                portId: 1,
                port_A_Description: 'CORFU PORT',
                adults_A_WithTransfer: [0, [Validators.required, Validators.maxLength(3)]],
                adults_A_PriceWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_A_AmountWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_A_WithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_A_PriceWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_A_AmountWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_A_WithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_A_PriceWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_A_AmountWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_A_WithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_A_PriceWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_A_AmountWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                free_A_WithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
                free_A_WithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
                total_A_Persons: [0],
                total_A_Amount: [0]
            }),
            portB: this.formBuilder.group({
                id: 0,
                invoiceId: '',
                portId: 2,
                port_B_Description: 'LEFKIMMI PORT',
                adults_B_WithTransfer: [0, [Validators.required, Validators.maxLength(3)]],
                adults_B_PriceWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_B_AmountWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_B_WithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_B_PriceWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                adults_B_AmountWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_B_WithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_B_PriceWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_B_AmountWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_B_WithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_B_PriceWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                kids_B_AmountWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
                free_B_WithTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
                free_B_WithoutTransfer: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
                total_B_Persons: [0],
                total_B_Amount: [0]
            }),
            portTotals: this.formBuilder.group({
                port_Totals_Description: '',
                adults_Total_WithTransfer: 0,
                adults_TotalAmount_WithTransfer: 0,
                adults_Total_WithoutTransfer: 0,
                adults_TotalAmount_WithoutTransfer: 0,
                kids_Total_WithTransfer: 0,
                kids_TotalAmount_WithTransfer: 0,
                kids_Total_WithoutTransfer: 0,
                kids_TotalAmount_WithoutTransfer: 0,
                free_Total_WithTransfer: 0,
                free_Total_WithoutTransfer: 0,
                total_Persons: 0,
                total_Amount: 0
            }),
            aade: this.formBuilder.group({
                id: 0,
                uId: '',
                mark: '',
                markCancel: '',
                invoiceId: '',
                qrUrl: '',
            }),
            remarks: ['', Validators.maxLength(128)],
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: [''],
        })
    }

    private patchFormWithCalculations(calculationsA: any, calculationsB: any, calculationTotals: any): void {
        this.form.patchValue({
            portA: {
                adults_A_AmountWithTransfer: calculationsA.adults_A_AmountWithTransfer,
                adults_A_AmountWithoutTransfer: calculationsA.adults_A_AmountWithoutTransfer,
                kids_A_AmountWithTransfer: calculationsA.kids_A_AmountWithTransfer,
                kids_A_AmountWithoutTransfer: calculationsA.kids_A_AmountWithoutTransfer,
                total_A_Persons: calculationsA.total_A_Persons,
                total_A_Amount: calculationsA.total_A_Amount
            },
            portB: {
                adults_B_AmountWithTransfer: calculationsB.adults_B_AmountWithTransfer,
                adults_B_AmountWithoutTransfer: calculationsB.adults_B_AmountWithoutTransfer,
                kids_B_AmountWithTransfer: calculationsB.kids_B_AmountWithTransfer,
                kids_B_AmountWithoutTransfer: calculationsB.kids_B_AmountWithoutTransfer,
                total_B_Persons: calculationsB.total_B_Persons,
                total_B_Amount: calculationsB.total_B_Amount
            },
            portTotals: {
                adults_Total_WithTransfer: calculationTotals.adultsWithTransfer,
                adults_TotalAmount_WithTransfer: calculationsA.adults_A_AmountWithTransfer + calculationsB.adults_B_AmountWithTransfer,
                adults_Total_WithoutTransfer: calculationTotals.adultsWithoutTransfer,
                adults_TotalAmount_WithoutTransfer: calculationsA.adults_A_AmountWithoutTransfer + calculationsB.adults_B_AmountWithoutTransfer,
                kids_Total_WithTransfer: calculationTotals.kidsWithTransfer,
                kids_TotalAmount_WithTransfer: calculationsA.kids_A_AmountWithTransfer + calculationsB.kids_B_AmountWithTransfer,
                kids_Total_WithoutTransfer: calculationTotals.kidsWithoutTransfer,
                kids_TotalAmount_WithoutTransfer: calculationsA.kids_A_AmountWithoutTransfer + calculationsB.kids_B_AmountWithoutTransfer,
                free_Total_WithTransfer: calculationTotals.freeWithTransfer,
                free_Total_WithoutTransfer: calculationTotals.freeWithoutTransfer,
                total_Persons: calculationTotals.totalPersons,
                total_Amount: calculationTotals.totalAmount
            }
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customers', 'dropdownCustomers', 'customer', ['id', 'abbreviation', 'isActive'], 'abbreviation', 'abbreviation')
        this.populateDropdownFromDexieDB('destinations', 'dropdownDestinations', 'destination', ['id', 'description', 'isActive'], 'description', 'description')
        this.populateDropdownFromDexieDB('documentTypes', 'dropdownDocumentTypes', 'documentType', ['id', 'abbreviation', 'description', 'batch', 'lastNo', 'isActive'], 'abbreviation', 'abbreviation')
        this.populateDropdownFromDexieDB('paymentMethods', 'dropdownPaymentMethods', 'paymentMethod', ['id', 'description', 'isActive'], 'description', 'description')
        this.populateDropdownFromDexieDB('ships', 'dropdownShips', 'ship', ['id', 'description', 'isActive'], 'description', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperties: string[], orderBy: string, lookupField: string): void {
        const x = []
        let item = {}
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            response.forEach(record => {
                modelProperties.forEach(property => {
                    item[property] = record[property]
                })
                x.push(item)
                item = {}
            })
            this[dexieTable] = this.recordId == undefined ? x.filter(x => x.isActive) : x
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, lookupField, value)))
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.patchValue({
                invoiceId: this.record.invoiceId,
                date: this.record.date,
                customer: { 'id': this.record.customer.id, 'abbreviation': this.record.customer.abbreviation },
                destination: { 'id': this.record.destination.id, 'description': this.record.destination.description },
                documentType: { 'id': this.record.documentType.id, 'abbreviation': this.record.documentType.abbreviation },
                documentTypeDescription: this.record.documentType.description,
                no: this.record.no,
                batch: this.record.documentType.batch,
                paymentMethod: { 'id': this.record.paymentMethod.id, 'description': this.record.paymentMethod.description },
                ship: { 'id': this.record.ship.id, 'description': this.record.ship.description },
                adults: this.record.adults,
                kids: this.record.kids,
                free: this.record.free,
                totalPax: this.record.totalPax,
                remarks: this.record.remarks,
                netAmount: this.record.netAmount,
                vatPercent: this.record.vatPercent,
                vatAmount: this.record.vatAmount,
                grossAmount: this.record.grossAmount,
                postAt: this.record.postAt,
                postUser: this.record.postUser,
                putAt: this.record.putAt,
                putUser: this.record.putUser,
                aade: {
                    invoiceId: this.record.aade.invoiceId,
                    uId: this.record.aade.uId,
                    mark: this.record.aade.mark,
                    markCancel: this.record.aade.markCancel,
                    qrUrl: this.record.aade.qrUrl
                },
                invoicesPorts: this.populatePorts()
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(invoice: InvoiceWriteDto): void {
        this.invoiceHttpService.save(invoice).subscribe({
            next: (response) => {
                this.form.patchValue({
                    invoiceId: response.id
                })
                this.onDoSubmitTasks()
            },
            error: (errorFromInterceptor) => {
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

    public retrievePrices(): void {
        const x: BillingCriteriaVM = {
            date: this.dateHelperService.formatDateToIso(new Date(this.form.value.date)),
            customerId: this.form.value.customer.id,
            destinationId: this.form.value.destination.id
        }
        const z = this.form.controls['invoicesPorts'] as FormArray
        this.priceHttpService.retrievePrices(x).subscribe(response => {
            response.forEach((record, index) => {
                z.controls[index].patchValue({
                    adultsPriceWithTransfer: record.adultsWithTransfer,
                    adultsPriceWithoutTransfer: record.adultsWithoutTransfer,
                    kidsPriceWithTransfer: record.kidsWithTransfer,
                    kidsPriceWithoutTransfer: record.kidsWithoutTransfer,
                })
            })

        })
    }

    private updateFieldsAfterEmptyDocumentType(): void {
        this.form.get('documentType').valueChanges.subscribe(value => {
            if (value == '') {
                this.form.patchValue({
                    documentTypeDescription: '',
                    no: 0,
                    batch: ''
                })
            }
        })
    }

    //#endregion

    //#region getters

    get date(): AbstractControl {
        return this.form.get('date')
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

    get destination(): AbstractControl {
        return this.form.get('destination')
    }

    get ship(): AbstractControl {
        return this.form.get('ship')
    }

    get netAmount(): AbstractControl {
        return this.form.get('netAmount')
    }

    get vatPercent(): AbstractControl {
        return this.form.get('vatPercent')
    }

    get vatAmount(): AbstractControl {
        return this.form.get('vatAmount')
    }

    get grossAmount(): AbstractControl {
        return this.form.get('grossAmount')
    }

    get remarks(): AbstractControl {
        return this.form.get('remarks')
    }

    get port_A_Description(): AbstractControl {
        return this.form.get('portA.portDescription')
    }

    get adults_A_WithTransfer(): AbstractControl {
        return this.form.get('portA.adults_A_WithTransfer')
    }

    get adults_A_PriceWithTransfer(): AbstractControl {
        return this.form.get('portA.adults_A_PriceWithTransfer')
    }

    get adults_A_AmountWithTransfer(): AbstractControl {
        return this.form.get('portA.adults_A_AmountWithTransfer')
    }

    get adults_A_WithoutTransfer(): AbstractControl {
        return this.form.get('portA.adults_A_WithoutTransfer')
    }

    get adults_A_PriceWithoutTransfer(): AbstractControl {
        return this.form.get('portA.adults_A_PriceWithoutTransfer')
    }

    get adults_A_AmountWithoutTransfer(): AbstractControl {
        return this.form.get('portA.adults_A_AmountWithoutTransfer')
    }

    get kids_A_WithTransfer(): AbstractControl {
        return this.form.get('portA.kids_A_WithTransfer')
    }

    get kids_A_PriceWithTransfer(): AbstractControl {
        return this.form.get('portA.kids_A_PriceWithTransfer')
    }

    get kids_A_AmountWithTransfer(): AbstractControl {
        return this.form.get('portA.kids_A_AmountWithTransfer')
    }

    get kids_A_WithoutTransfer(): AbstractControl {
        return this.form.get('portA.kids_A_WithoutTransfer')
    }

    get kids_A_PriceWithoutTransfer(): AbstractControl {
        return this.form.get('portA.kids_A_PriceWithoutTransfer')
    }

    get kids_A_AmountWithoutTransfer(): AbstractControl {
        return this.form.get('portA.kids_A_AmountWithoutTransfer')
    }

    get free_A_WithTransfer(): AbstractControl {
        return this.form.get('portA.free_A_WithTransfer')
    }

    get free_A_WithoutTransfer(): AbstractControl {
        return this.form.get('portA.free_A_WithoutTransfer')
    }

    get total_A_Persons(): AbstractControl {
        return this.form.get('total_A_Persons')
    }

    get total_A_Amount(): AbstractControl {
        return this.form.get('total_A_Amount')
    }

    get port_B_Description(): AbstractControl {
        return this.form.get('portB.portDescription')
    }

    get adults_B_WithTransfer(): AbstractControl {
        return this.form.get('portB.adults_B_WithTransfer')
    }

    get adults_B_PriceWithTransfer(): AbstractControl {
        return this.form.get('portB.adults_B_PriceWithTransfer')
    }

    get adults_B_AmountWithTransfer(): AbstractControl {
        return this.form.get('portB.adults_B_AmountWithTransfer')
    }

    get adults_B_WithoutTransfer(): AbstractControl {
        return this.form.get('portB.adults_B_WithoutTransfer')
    }

    get adults_B_PriceWithoutTransfer(): AbstractControl {
        return this.form.get('portB.adults_B_PriceWithoutTransfer')
    }

    get adults_B_AmountWithoutTransfer(): AbstractControl {
        return this.form.get('portB.adults_B_AmountWithoutTransfer')
    }

    get kids_B_WithTransfer(): AbstractControl {
        return this.form.get('portB.kids_B_WithTransfer')
    }

    get kids_B_PriceWithTransfer(): AbstractControl {
        return this.form.get('portB.kids_B_PriceWithTransfer')
    }

    get kids_B_AmountWithTransfer(): AbstractControl {
        return this.form.get('portB.kids_B_AmountWithTransfer')
    }

    get kids_B_WithoutTransfer(): AbstractControl {
        return this.form.get('portB.kids_B_WithoutTransfer')
    }

    get kids_B_PriceWithoutTransfer(): AbstractControl {
        return this.form.get('portB.kids_B_PriceWithoutTransfer')
    }

    get kids_B_AmountWithoutTransfer(): AbstractControl {
        return this.form.get('portB.kids_B_AmountWithoutTransfer')
    }

    get free_B_WithTransfer(): AbstractControl {
        return this.form.get('portB.free_B_WithTransfer')
    }

    get free_B_WithoutTransfer(): AbstractControl {
        return this.form.get('portB.free_B_WithoutTransfer')
    }

    get total_B_Persons(): AbstractControl {
        return this.form.get('total_B_Persons')
    }

    get total_B_Amount(): AbstractControl {
        return this.form.get('total_B_Amount')
    }

    get adults_Total_WithTransfer(): AbstractControl {
        return this.form.get('portTotals.adults_Total_WithTransfer')
    }

    get adults_TotalAmount_WithTransfer(): AbstractControl {
        return this.form.get('portTotals.adults_TotalAmount_WithTransfer')
    }

    get adults_Total_WithoutTransfer(): AbstractControl {
        return this.form.get('portTotals.adults_Total_WithoutTransfer')
    }

    get adults_TotalAmount_WithoutTransfer(): AbstractControl {
        return this.form.get('portTotals.adults_TotalAmount_WithoutTransfer')
    }

    get kids_Total_WithTransfer(): AbstractControl {
        return this.form.get('portTotals.kids_Total_WithTransfer')
    }

    get kids_TotalAmount_WithTransfer(): AbstractControl {
        return this.form.get('portTotals.kids_TotalAmount_WithTransfer')
    }

    get kids_Total_WithoutTransfer(): AbstractControl {
        return this.form.get('portTotals.kids_Total_WithoutTransfer')
    }

    get kids_TotalAmount_WithoutTransfer(): AbstractControl {
        return this.form.get('portTotals.kids_TotalAmount_WithoutTransfer')
    }

    get free_Total_WithTransfer(): AbstractControl {
        return this.form.get('portTotals.free_Total_WithTransfer')
    }

    get free_Total_WithoutTransfer(): AbstractControl {
        return this.form.get('portTotals.free_Total_WithoutTransfer')
    }

    get total_Persons(): AbstractControl {
        return this.form.get('portTotals.total_Persons')
    }

    get total_Amount(): AbstractControl {
        return this.form.get('portTotals.total_Amount')
    }

    //#endregion

}
