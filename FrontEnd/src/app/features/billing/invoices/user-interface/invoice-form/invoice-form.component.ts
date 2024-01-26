import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, map, startWith } from 'rxjs'
// Custom
import { CustomerAutoCompleteVM } from 'src/app/features/reservations/customers/classes/view-models/customer-autocomplete-vm'
import { DestinationAutoCompleteVM } from 'src/app/features/reservations/destinations/classes/view-models/destination-autocomplete-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { DocumentTypeVM } from '../../classes/view-models/documentType-vm'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InvoiceReadDto } from '../../classes/dtos/invoice-read-dto'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PortAutoCompleteVM } from 'src/app/features/reservations/ports/classes/view-models/port-autocomplete-vm'
import { PortReadDto } from '../../classes/dtos/port-read-dto'
import { ShipAutoCompleteVM } from './../../../../reservations/ships/classes/view-models/ship-autocomplete-vm'
import { ValidationService } from 'src/app/shared/services/validation.service'

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
    public isInvoiceTabVisible: boolean = true
    public isPortsTabVisible: boolean

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownCustomers: Observable<CustomerAutoCompleteVM[]>
    public dropdownDestinations: Observable<DestinationAutoCompleteVM[]>
    public dropdownDocumentTypes: Observable<DocumentTypeVM[]>
    public dropdownPaymentMethods: Observable<DocumentTypeVM[]>
    public dropdownPorts: Observable<PortAutoCompleteVM[]>
    public dropdownShips: Observable<ShipAutoCompleteVM[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private helperService: HelperService, private dialogService: DialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router,) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
        this.addPorts()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getPort(index: number): PortReadDto {
        return this.record.ports[index]
    }

    public onShowPortsTab(): void {
        this.isInvoiceTabVisible = false
        this.isPortsTabVisible = true
    }

    public onShowInvoiceTab(): void {
        this.isInvoiceTabVisible = true
        this.isPortsTabVisible = false
    }

    public patchFormWithSelectedDate(event: any): void {
        this.form.patchValue({
            date: event.value.date
        })
    }

    public getDate(): string {
        return this.form.value.date
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

    public onSave(): void {
        // this.saveRecord(this.flattenForm())
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public doPaxCalculations(): void {
        // this.calculateTotalPax()
    }

    //#endregion

    //#region private methods

    private doNewOrEditTasks(): void {
        if (this.isNewRecord) {
            // this.addPorts()
        } else {
            this.getRecord().then(() => {
                this.populateFields()
            })
        }
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
            no: '',
            customer: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            taxNo: '',
            email: '',
            destination: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentType: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            paymentMethod: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            ship: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            adults: [0, [Validators.required, Validators.maxLength(3)]],
            kids: [0, [Validators.required, Validators.maxLength(3)]],
            free: [0, [Validators.required, Validators.maxLength(3)]],
            totalPax: [0, ValidationService.isGreaterThanZero],
            remarks: ['', Validators.maxLength(128)],
            netAmount: [0, ValidationService.isGreaterThanZero],
            vatPercent: [0, ValidationService.isGreaterThanZero],
            vatAmount: [0, ValidationService.isGreaterThanZero],
            grossAmount: [0, ValidationService.isGreaterThanZero],
            ports: this.formBuilder.array([]),
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: [''],
        })
    }

    public addPorts(): void {
        if (this.recordId == undefined) {
            setTimeout(() => {
                const ports = this.form.get('ports') as FormArray
                for (let index = 0; index < 2; index++) {
                    ports.push(this.createPort())
                }
            }, 1000)
        }
    }

    private createPort(): FormGroup {
        const port = this.formBuilder.group({
            port: [''],
            adultsWithTransfer: [0, [Validators.required, Validators.maxLength(3)]],
            adultsAmountWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            adultsWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            adultsAmountWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            kidsWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            kidsAmountWithTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            kidsWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            kidsAmountWithoutTransfer: [0, [Validators.required, Validators.maxLength(4)]],
            free: [0, [Validators.required, Validators.maxLength(4)]],
            total: [0],
            totalAmount: [0]
        })
        return port
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customers', 'dropdownCustomers', 'customer', 'description', 'description')
        this.populateDropdownFromDexieDB('destinations', 'dropdownDestinations', 'destination', 'description', 'description')
        this.populateDropdownFromDexieDB('documentTypes', 'dropdownDocumentTypes', 'documentType', 'description', 'description')
        this.populateDropdownFromDexieDB('paymentMethods', 'dropdownPaymentMethods', 'paymentMethod', 'description', 'description')
        this.populateDropdownFromDexieDB('ports', 'dropdownPorts', 'port', 'description', 'description')
        this.populateDropdownFromDexieDB('ships', 'dropdownShips', 'ship', 'description', 'description')
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
                no: this.record.no,
                customer: { 'id': this.record.customer.id, 'description': this.record.customer.description },
                taxNo: this.record.customer.taxNo,
                email: this.record.customer.email,
                destination: { 'id': this.record.destination.id, 'description': this.record.destination.description },
                documentType: { 'id': this.record.documentType.id, 'description': this.record.documentType.description },
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
                ports: this.populatePorts()
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
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

    public onDoNothing(): void {
        this.dialogService.open(this.messageDialogService.featureNotAvailable(), 'error', ['ok'])
    }

    private populatePorts(): void {
        const x = this.form.controls['ports'] as FormArray
        this.record.ports.forEach((port: any) => {
            x.push(new FormControl({
                id: port.id,
                invoiceId: port.invoiceId,
                port: {
                    id: port.port.id,
                    description: port.port.description
                },
                adultsWithTransfer: port.adultsWithTransfer,
                adultsPriceWithTransfer: port.adultsPriceWithTransfer,
                adultsWithoutTransfer: port.adultsWithoutTransfer,
                adultsPriceWithoutTransfer: port.adultsPriceWithoutTransfer,
                kidsWithTransfer: port.kidsWithTransfer,
                kidsPriceWithTransfer: port.kidsPriceWithTransfer,
                kidsWithoutTransfer: port.kidsWithoutTransfer,
                kidsPriceWithoutTransfer: port.kidsPriceWithoutTransfer,
                freeWithTransfer: port.freeWithTransfer,
                freeWithoutTransfer: port.freeWithoutTransfer,
                totalPax: port.totalPax,
                totalAmount: port.totalAmount
            }))
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

    get no(): AbstractControl {
        return this.form.get('no')
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

    // get ports(): FormArray {
    //     return this.form.get('ports') as FormArray
    // }

    //#endregion

}
