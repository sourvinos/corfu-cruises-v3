import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
// Custom
import { BoardingPassService } from '../../classes/boarding-pass/services/boarding-pass.service'
import { CachedReservationDialogComponent } from '../cached-reservation-dialog/cached-reservation-dialog.component'
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { CustomerAutoCompleteVM } from '../../../customers/classes/view-models/customer-autocomplete-vm'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DestinationAutoCompleteVM } from '../../../destinations/classes/view-models/destination-autocomplete-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { DriverAutoCompleteVM } from '../../../drivers/classes/view-models/driver-autocomplete-vm'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PickupPointAutoCompleteVM } from '../../../pickupPoints/classes/view-models/pickupPoint-autocomplete-vm'
import { PortAutoCompleteVM } from '../../../ports/classes/view-models/port-autocomplete-vm'
import { ReservationHelperService } from '../../classes/services/reservation.helper.service'
import { ReservationHttpService } from '../../classes/services/reservation.http.service'
import { ReservationReadDto } from '../../classes/dtos/form/reservation-read-dto'
import { ReservationWriteDto } from '../../classes/dtos/form/reservation-write-dto'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ValidationService } from './../../../../../shared/services/validation.service'
import { ShipOwnerBrowserStorageVM } from '../../../shipOwners/classes/view-models/shipOwner-autocomplete-vm'
import { DocumentTypeAutoCompleteVM } from 'src/app/features/billing/documentTypes/classes/view-models/documentType-autocomplete-vm'
import { DocumentTypeHttpService } from 'src/app/features/billing/documentTypes/classes/services/documentType-http.service'
import { DocumentTypeReadDto } from 'src/app/features/billing/documentTypes/classes/dtos/documentType-read-dto'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { RetailSaleWriteDto } from 'src/app/features/retail-sales/classes/dtos/retailSale-write-dto'
import { RetailSaleHttpService } from 'src/app/features/retail-sales/classes/services/retailSale-http.service'
import { environment } from 'src/environments/environment'
import { EmailRetailSaleVM } from 'src/app/features/retail-sales/classes/view-models/email/email-retailSale-vm'
import { RetailSaleXmlHttpService } from 'src/app/features/retail-sales/classes/services/retailSale-xml-http.service'
import { RetailSaleXmlHelperService } from 'src/app/features/retail-sales/classes/services/retailSale-xml-helper.service'

@Component({
    selector: 'reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './reservation-form.component.css']
})

export class ReservationFormComponent {

    //#region common

    private record: ReservationReadDto
    private recordId: string
    public feature = 'reservationForm'
    public featureIcon = 'reservations'
    public reservationForm: FormGroup
    public retailSaleForm: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = ''

    //#endregion

    //#region specific

    private mirrorRecord: ReservationReadDto
    private mustGoBackAfterSave = true
    public isNewRecord: boolean
    public isNewRetailSale: boolean
    public passengerDifferenceColor: string

    //#endregion

    //#region autocompletes

    public isAutoCompleteDisabled = true
    public dropdownCustomers: Observable<CustomerAutoCompleteVM[]>
    public dropdownDestinations: Observable<DestinationAutoCompleteVM[]>
    public dropdownDrivers: Observable<DriverAutoCompleteVM[]>
    public dropdownPickupPoints: Observable<PickupPointAutoCompleteVM[]>
    public dropdownPorts: Observable<PortAutoCompleteVM[]>
    public dropdownPortsAlternate: Observable<PortAutoCompleteVM[]>
    public dropdownShipOwners: Observable<ShipOwnerBrowserStorageVM[]>
    public dropdownShips: Observable<DriverAutoCompleteVM[]>
    public dropdownDocumentTypes: Observable<DocumentTypeAutoCompleteVM[]>
    public dropdownPaymentMethods: Observable<SimpleEntity[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private boardingPassService: BoardingPassService, private cryptoService: CryptoService, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialog: MatDialog, private dialogService: DialogService, private documentTypeHttpService: DocumentTypeHttpService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private reservationHelperService: ReservationHelperService, private reservationHttpService: ReservationHttpService, private retailSaleHttpService: RetailSaleHttpService, private retailSaleXmlHelperService: RetailSaleXmlHelperService, private retailSaleXmlHttpService: RetailSaleXmlHttpService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initReservationForm()
        this.initRetailSaleForm()
        this.updateFieldsAfterEmptyPickupPoint()
        this.setRecordId()
        this.setNewRecord()
        this.doNewOrEditReservationTasks()
        this.doNewOrEditRetailSaleTasks()
        this.doPostInitTasks()
        this.setTabTitle()
        this.setPassengerListHeight()
    }

    ngAfterViewInit(): void {
        this.leftAlignLastTab()
        this.focusOnField()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public checkForDifferenceBetweenTotalPaxAndPassengers(element?: any): boolean {
        return this.reservationHelperService.checkForDifferenceBetweenTotalPaxAndPassengers(element, this.reservationForm.value.totalPax, this.reservationForm.value.passengers.length)
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public doPaxCalculations(): void {
        this.calculateTotalPax()
        this.getPassengerDifferenceColor()
        this.updateRetailSaleFormWithPax()
    }

    public doTasksAfterPassengerFormIsClosed(passengers: any): void {
        this.patchFormWithPassengers(passengers)
        this.saveCachedReservation()
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getPassengerDifferenceColor(): string {
        this.passengerDifferenceColor = this.reservationHelperService.getPassengerDifferenceColor(this.reservationForm.value.totalPax, this.reservationForm.value.passengers ? this.reservationForm.value.passengers.length : 0)
        return this.emojiService.getEmoji(this.passengerDifferenceColor)
    }

    public getEmojiForActiveRecord(isActive: boolean): string {
        return this.emojiService.getEmoji(isActive ? 'active' : 'notActive')
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    public isAdminOrNewRecord(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' || this.recordId == null
    }

    public isDevelopment(): boolean {
        return environment.production == false
    }

    public isReservationFormPristine(): boolean {
        return this.reservationForm.pristine
    }

    public isRetailSaleFormPristine(): boolean {
        return this.retailSaleForm.pristine
    }

    public isReservationInStorage(): boolean {
        try {
            const x = JSON.parse(this.localStorageService.getItem('reservation'))
            if (this.isNewRecord == true && x.reservationId == '') {
                return true
            }
            if (this.isNewRecord == false && x.reservationId == this.record.reservationId) {
                return true
            }
        } catch (e) {
            return false
        }
    }

    public onBuildAndOpenRetailSalePdf(): void {
        this.retailSaleHttpService.buildPdf(this.reservationForm.value.reservationId).subscribe({
            next: (response) => {
                this.retailSaleHttpService.openPdf(response.body).subscribe({
                    next: (response) => {
                        const blob = new Blob([response], { type: 'application/pdf' })
                        const fileURL = URL.createObjectURL(blob)
                        window.open(fileURL, '_blank')
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
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.reservationHttpService.delete(this.reservationForm.value.reservationId).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                        this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                        this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onDoCalculations(): void {
        this.calculateAmounts()
        this.calculatePax()
        this.calculateSummary()
    }

    public onDoSubmitTasks(): void {
        this.doSubmitTasks()
    }

    public onEmailRetailSale(): void {
        this.retailSaleHttpService.buildPdf(this.reservationForm.value.reservationId).subscribe({
            next: (response) => {
                const criteria: EmailRetailSaleVM = {
                    email: this.reservationForm.value.email,
                    filename: response.body
                }
                this.emailRetailSale(criteria)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private calculateSummary(): void {
        const grossAmount = parseFloat(this.retailSaleForm.value.grossAmount)
        const vatPercent = parseFloat(this.retailSaleForm.value.vatPercent) / 100
        const netAmount = grossAmount / (1 + vatPercent)
        const vatAmount = netAmount * vatPercent
        this.retailSaleForm.patchValue({
            netAmount: netAmount.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            grossAmount: grossAmount.toFixed(2)
        })
    }

    private calculateAmounts(): void {
        const adultsAmount = this.retailSaleForm.value.adults * this.retailSaleForm.value.adultsPrice
        const kidsAmount = this.retailSaleForm.value.kids * this.retailSaleForm.value.kidsPrice
        this.retailSaleForm.patchValue({
            adultsAmount: adultsAmount,
            kidsAmount: kidsAmount,
            grossAmount: adultsAmount + kidsAmount
        })
    }

    private calculatePax(): void {
        this.retailSaleForm.patchValue({
            pax: this.retailSaleForm.value.adults + this.retailSaleForm.value.kids + this.retailSaleForm.value.free
        })
    }

    public onEmailBoardingPass(): void {
        if (this.helperService.deepEqual(this.reservationForm.value, this.mirrorRecord) == false || this.arePassengersMissing() || this.reservationForm.value.email == '') {
            this.mustGoBackAfterSave = false
            this.dialogService.open(this.messageDialogService.threePointReservationValidation(), 'error', ['ok'])
        } else {
            this.boardingPassService.emailBoardingPass(this.reservationForm.value.reservationId).subscribe({
                next: () => {
                    this.helperService.doPostSaveFormTasks(this.messageDialogService.emailSent(), 'ok', this.parentUrl, false)
                    this.mustGoBackAfterSave = true
                },
                error: (errorFromInterceptor) => {
                    this.helperService.doPostSaveFormTasks(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, false)
                }
            })
        }
    }

    public onPrintBoardingPass(): void {
        if (this.helperService.deepEqual(this.reservationForm.value, this.mirrorRecord) == false || this.arePassengersMissing()) {
            this.mustGoBackAfterSave = false
            this.dialogService.open(this.messageDialogService.twoPointReervationValidation(), 'error', ['ok'])
        } else {
            this.boardingPassService.getCompanyData().then(response => {
                this.boardingPassService.printBoardingPass(this.boardingPassService.createBoardingPass(this.reservationForm.value, response.body.phones, response.body.email))
            })
        }
    }

    public onSaveReservation(keepFormOpen: boolean): void {
        this.saveReservation(this.flattenReservationForm(), keepFormOpen)
    }

    public onSaveRetailSale(): void {
        this.saveRetailSale(this.flattenRetailSaleForm())
    }

    public onShowCachedReservationDialog(): void {
        const dialogRef = this.dialog.open(CachedReservationDialogComponent, {
            width: '31rem',
            height: '34rem',
            panelClass: 'dialog',
            autoFocus: 'false'
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                if (result.selectedOption.id == 1) {
                    this.getCachedReservation()
                    this.populateReservationFields()
                    this.getPassengerDifferenceColor()
                }
                if (result.selectedOption.id == 2) {
                    this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                    this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
                }
            }
        })
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.reservationForm, element, trigger)
    }

    public async updateDocumentTypesAfterShipOwnerSelection(value: SimpleEntity): Promise<void> {
        this.populateDocumentTypesAfterShipOwnerSelection('documentTypesRetail', 'dropdownDocumentTypes', 'documentType', 'abbreviation', 'abbreviation', value.id)
        this.updateVatPercentAfterShipOwnerSelection(this.retailSaleForm.value.shipOwner)
        this.calculateSummary()
    }

    public updateFieldsAfterPickupPointSelection(value: PickupPointAutoCompleteVM): void {
        this.reservationForm.patchValue({
            exactPoint: value.exactPoint,
            time: value.time,
            port: {
                id: value.port.id,
                description: value.port.description
            },
            portAlternate: {
                id: value.port.id,
                description: value.port.description
            }
        })
    }

    public areFormsPristine(): boolean {
        return this.retailSaleForm.pristine && this.retailSaleForm.valid && this.reservationForm.pristine
    }

    public areFormsPristineAndEmailIsGiven(): boolean {
        return this.retailSaleForm.pristine && this.retailSaleForm.valid && this.reservationForm.pristine && this.reservationForm.value.email != ''
    }

    //#endregion

    //#region private methods

    private arePassengersMissing(): boolean {
        return this.reservationForm.value.totalPax != this.reservationForm.value.passengers.length
    }

    private calculateTotalPax(): void {
        const totalPax = parseInt(this.reservationForm.value.adults, 10) + parseInt(this.reservationForm.value.kids, 10) + parseInt(this.reservationForm.value.free, 10)
        this.reservationForm.patchValue({
            totalPax: Number(totalPax) ? totalPax : 0
        })
    }

    private cleanup(): void {
        this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
    }

    private cloneRecord(): void {
        this.mirrorRecord = this.reservationForm.value
    }

    private doNewOrEditReservationTasks(): void {
        if (this.isNewRecord) {
            if (this.isAdmin()) {
                this.getStoredDate()
                this.getStoredDestination()
                this.getPassengerDifferenceColor()
            } else {
                this.reservationHttpService.validateCreditLimit().subscribe((response: { body: { maxAllowed: number } }) => {
                    if (response.body.maxAllowed > 0) {
                        this.getStoredDate()
                        this.getStoredDestination()
                        this.getPassengerDifferenceColor()
                    } else {
                        this.dialogService.open(this.messageDialogService.maximumBalanceExceeded(), 'error', ['ok']).subscribe(() => {
                            this.goBack()
                        })
                    }
                })
            }
        } else {
            this.getRecord()
            this.populateReservationFields()
            this.populateRetailSaleFields()
            this.updateDocumentTypesAfterShipOwnerSelection(this.retailSaleForm.value.shipOwner)
            this.onDoCalculations()
            this.getPassengerDifferenceColor()
            this.cloneRecord()
        }
    }

    private doPostInitTasks(): void {
        this.getLinkedCustomer()
        this.populateDropdowns()
        this.setLocale()
        this.setParentUrl()
        this.subscribeToInteractionService()
    }

    private doSubmitTasks(): void {
        this.retailSaleXmlHttpService.get(this.reservationForm.value.reservationId).subscribe(response => {
            this.retailSaleXmlHttpService.uploadInvoice(response.body).subscribe({
                next: (response) => {
                    this.retailSaleHttpService.patchRetailSaleAade(this.retailSaleXmlHelperService.processRetailSaleSuccessResponse(response)).subscribe({
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

    private emailRetailSale(criteria: EmailRetailSaleVM): void {
        this.retailSaleHttpService.emailRetailSale(criteria).subscribe({
            complete: () => {
                this.retailSaleHttpService.patchRetailSaleWithEmailSent(criteria.filename).subscribe({
                    next: () => {
                        this.retailSaleForm.patchValue({
                            isEmailSent: true
                        })
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, false)
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
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenReservationForm(): ReservationWriteDto {
        return this.reservationHelperService.flattenReservationForm(this.reservationForm.value)
    }

    private flattenRetailSaleForm(): RetailSaleWriteDto {
        return this.reservationHelperService.flattenRetailSaleForm(this.retailSaleForm.value)
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getLinkedCustomer(): void {
        if (this.isNewRecord && this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'false') {
            this.reservationHelperService.getLinkedCustomer().then((response => {
                if (response != undefined) {
                    this.reservationForm.patchValue({
                        customer: {
                            'id': response.id,
                            'description': response.description
                        }
                    })
                }
            }))
        }
    }

    private getRecord(): Promise<any> {
        return new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data['reservationForm']
            if (formResolved.error == null) {
                this.record = formResolved.record.body
                resolve(this.record)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(new Error('500')), 'error', ['ok'])
                this.goBack()
            }
        })
    }

    private getCachedReservation(): void {
        this.record = JSON.parse(this.localStorageService.getItem('reservation'))
    }

    private getLastDocumentTypeNo(id: number): Observable<any> {
        return this.documentTypeHttpService.getLastDocumentTypeNoFromRetailSales(id)
    }

    private getStoredDate(): void {
        if (this.sessionStorageService.getItem('date') != '') {
            const x = this.sessionStorageService.getItem('date')
            this.reservationForm.patchValue({
                date: x
            })
        }
    }

    private getStoredDestination(): void {
        if (this.sessionStorageService.getItem('destination') != '') {
            const x = JSON.parse(this.sessionStorageService.getItem('destination'))
            this.reservationForm.patchValue({
                destination: {
                    id: x.id,
                    description: x.description
                }
            })
        }
    }

    private goBack(): void {
        const x = this.sessionStorageService.getItem('date')
        if (x != '') {
            this.router.navigate(['/reservations/date/' + x])
        } else {
            this.router.navigate(['/reservations'])
        }
    }

    private initRetailSaleForm(): void {
        this.retailSaleForm = this.formBuilder.group({
            reservationId: '',
            date: [new Date(), [Validators.required]],
            tripDate: [new Date(), [Validators.required]],
            shipOwner: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentType: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            documentTypeDescription: '',
            batch: '',
            invoiceNo: 0,
            paymentMethod: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            adults: [0],
            adultsPrice: [0],
            adultsAmount: [0],
            kids: [0],
            kidsPrice: [0],
            kidsAmount: [0],
            free: [0],
            pax: [0],
            netAmount: [0, ValidationService.isGreaterThanZero],
            vatPercent: [0],
            vatAmount: [0, ValidationService.isGreaterThanZero],
            grossAmount: [0, [Validators.required, Validators.min(1), Validators.max(99999)]],
            passenger: ['', [Validators.required]],
            remarks: ['']
        })
    }

    private initReservationForm(): void {
        this.reservationForm = this.formBuilder.group({
            reservationId: '',
            date: ['', [Validators.required]],
            refNo: '',
            destination: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            customer: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            pickupPoint: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            exactPoint: '',
            time: '',
            adults: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            kids: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            free: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            totalPax: [0, ValidationService.isGreaterThanZero],
            driver: '',
            port: '',
            portAlternate: '',
            ship: '',
            ticketNo: ['', [Validators.required, Validators.maxLength(128)]],
            email: ['', [Validators.maxLength(128), Validators.email]],
            phones: ['', Validators.maxLength(128)],
            remarks: ['', Validators.maxLength(128)],
            imageBase64: '',
            passengers: [[]],
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private leftAlignLastTab(): void {
        this.isAdmin() ? this.helperService.leftAlignLastTab() : null
    }

    private patchFormWithPassengers(passengers: any): void {
        this.reservationForm.patchValue({
            passengers: passengers
        })
    }

    private populateDocumentTypesAfterShipOwnerSelection(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string, shipOwnerId: number): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = response.filter(x => x.shipOwner.id == shipOwnerId).filter(x => x.isActive)
            this[filteredTable] = this.retailSaleForm.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('reservationForm', 'customers', 'dropdownCustomers', 'customer', 'description', 'description')
        this.populateDropdownFromDexieDB('reservationForm', 'destinations', 'dropdownDestinations', 'destination', 'description', 'description')
        this.populateDropdownFromDexieDB('reservationForm', 'drivers', 'dropdownDrivers', 'driver', 'description', 'description')
        this.populateDropdownFromDexieDB('reservationForm', 'pickupPoints', 'dropdownPickupPoints', 'pickupPoint', 'description', 'description')
        this.populateDropdownFromDexieDB('reservationForm', 'ports', 'dropdownPorts', 'port', 'description', 'description')
        this.populateDropdownFromDexieDB('reservationForm', 'ports', 'dropdownPorts', 'portAlternate', 'description', 'description')
        this.populateDropdownFromDexieDB('reservationForm', 'ships', 'dropdownShips', 'ship', 'description', 'description')
        this.populateDropdownFromDexieDB('retailSaleForm', 'shipOwners', 'dropdownShipOwners', 'shipOwner', 'description', 'description')
        this.populateDropdownFromDexieDB('retailSaleForm', 'paymentMethods', 'dropdownPaymentMethods', 'paymentMethod', 'description', 'description')
    }

    private populateDropdownFromDexieDB(form: string, dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = this.recordId == undefined ? response.filter(x => x.isActive) : response
            this[filteredTable] = this[form].get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateReservationFields(): void {
        this.reservationForm.setValue({
            reservationId: this.record.reservationId,
            date: this.record.date,
            refNo: this.record.refNo,
            destination: { 'id': this.record.destination.id, 'description': this.record.destination.description },
            customer: { 'id': this.record.customer.id, 'description': this.record.customer.description },
            pickupPoint: { 'id': this.record.pickupPoint.id, 'description': this.record.pickupPoint.description },
            exactPoint: this.record.pickupPoint.exactPoint,
            time: this.record.pickupPoint.time,
            driver: { 'id': this.record.driver.id, 'description': this.record.driver.description },
            ship: { 'id': this.record.ship.id, 'description': this.record.ship.description },
            port: { 'id': this.record.pickupPoint.port.id, 'description': this.record.pickupPoint.port.description },
            portAlternate: { 'id': this.record.portAlternate.id, 'description': this.record.portAlternate.description },
            adults: this.record.adults,
            kids: this.record.kids,
            free: this.record.free,
            totalPax: this.record.totalPax,
            ticketNo: this.record.ticketNo,
            email: this.record.email,
            phones: this.record.phones,
            remarks: this.record.remarks,
            imageBase64: '',
            passengers: this.record.passengers,
            postAt: this.record.postAt,
            postUser: this.record.postUser,
            putAt: this.record.putAt,
            putUser: this.record.putUser
        })
    }

    private populateRetailSaleFields(): void {
        if (this.record.retailSale) {
            this.retailSaleForm.patchValue({
                id: this.record.retailSale.id,
                reservationId: this.record.retailSale.reservationId,
                date: this.record.retailSale.date,
                tripDate: this.record.retailSale.tripDate,
                invoiceNo: this.record.retailSale.invoiceNo,
                documentType: {
                    id: this.record.retailSale.documentType.id,
                    abbreviation: this.record.retailSale.documentType.abbreviation,
                    batch: this.record.retailSale.documentType.batch
                },
                batch: this.record.retailSale.documentType.batch,
                paymentMethod: {
                    id: this.record.retailSale.paymentMethod.id,
                    description: this.record.retailSale.paymentMethod.description
                },
                shipOwner: {
                    id: this.record.retailSale.shipOwner.id,
                    description: this.record.retailSale.shipOwner.description,
                    vatPercent: this.record.retailSale.shipOwner.vatPercent,
                    isActive: this.record.retailSale.shipOwner.isActive
                },
                passenger: this.record.retailSale.passenger,
                adults: this.record.retailSale.adults,
                adultsPrice: this.record.retailSale.adultsPrice,
                kids: this.record.retailSale.kids,
                kidsPrice: this.record.retailSale.kidsPrice,
                free: this.record.retailSale.free,
                netAmount: this.record.retailSale.netAmount,
                vatPercent: this.record.retailSale.vatPercent,
                vatAmount: this.record.retailSale.vatAmount,
                grossAmount: this.record.retailSale.grossAmount,
                postAt: this.record.retailSale.postAt,
                postUser: this.record.retailSale.postUser,
                putAt: this.record.retailSale.putAt,
                putUser: this.record.retailSale.putUser
            })
        }
    }

    private saveCachedReservation(): void {
        this.localStorageService.saveItem('reservation', JSON.stringify(this.reservationHelperService.createCachedReservation(this.reservationForm.value)))
    }

    private saveReservation(reservation: ReservationWriteDto, keepFormOpen: boolean): void {
        this.reservationHttpService.saveReservation(reservation).subscribe({
            next: (response) => {
                const date = this.dateHelperService.formatDateToIso(new Date(this.reservationForm.value.date))
                this.sessionStorageService.saveItem('date', date)
                this.parentUrl = this.sessionStorageService.getItem('returnUrl').includes('refNo')
                    ? this.sessionStorageService.getItem('returnUrl')
                    : '/reservations/date/' + date
                this.helperService.doPostSaveFormTasks('RefNo: ' + response.message, 'ok', this.parentUrl, !keepFormOpen)
                if (keepFormOpen) {
                    this.reservationForm.patchValue({
                        putAt: response.id
                    })
                    this.reservationForm.markAsPristine()
                }
                this.mirrorRecord = this.reservationForm.value
                this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private saveRetailSale(retailSale: RetailSaleWriteDto): void {
        retailSale.reservationId = this.reservationForm.value.reservationId
        this.retailSaleHttpService.save(retailSale).subscribe({
            next: () => {
                this.doSubmitTasks()
                this.retailSaleForm.setErrors({ invalid: true })
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })

    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setNewRecord(): void {
        this.isNewRecord = this.recordId == null
    }

    private setParentUrl(): void {
        if (this.sessionStorageService.getItem('returnUrl') == '/reservations') {
            if (this.sessionStorageService.getItem('date') != '') {
                this.parentUrl = '/reservations/date/' + this.sessionStorageService.getItem('date')
            } else {
                this.parentUrl = '/reservations'
            }
        }
        if (this.sessionStorageService.getItem('returnUrl') == '/availability') {
            this.parentUrl = '/availability'
        }
        if (this.sessionStorageService.getItem('returnUrl').includes('/reservations/refNo')) {
            this.parentUrl = this.sessionStorageService.getItem('returnUrl')
        }
    }

    private setPassengerListHeight(): void {
        setTimeout(() => {
            document.getElementById('content').style.height = document.getElementById('form-wrapper').offsetHeight - 64 + 'px'
        }, 100)
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.setLocale()
        })
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    public async updateDocumentTypeFieldsAfterDocumentTypeSelection(value: DocumentTypeAutoCompleteVM): Promise<void> {
        this.documentTypeHttpService.getSingle(value.id).subscribe({
            next: (response) => {
                const x: DocumentTypeReadDto = response.body
                this.getLastDocumentTypeNo(value.id).subscribe(response => {
                    this.retailSaleForm.patchValue({
                        documentTypeDescription: x.description,
                        invoiceNo: response.body + 1,
                        batch: x.batchEn
                    })
                })
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private updateFieldsAfterEmptyPickupPoint(): void {
        this.reservationForm.get('pickupPoint').valueChanges.subscribe(value => {
            if (value == '') {
                this.reservationForm.patchValue({
                    exactPoint: '',
                    time: '',
                    port: '',
                    portAlternate: ''
                })
            }
        })
    }

    private async updatePaymentMethodWithDefaultValue(): Promise<void> {
        this.retailSaleForm.patchValue({
            paymentMethod: await this.dexieService.getByDefault('paymentMethods', 'isCash')
        })
    }

    private updateRetailSaleFormWithPax(): void {
        this.retailSaleForm.patchValue({
            adults: this.reservationForm.value.adults,
            kids: this.reservationForm.value.kids,
            free: this.reservationForm.value.free,
            pax: this.reservationForm.value.totalPax
        })
    }

    private updateRetailSaleFormWithTripDate(): void {
        this.retailSaleForm.patchValue({
            tripDate: this.reservationForm.value.date
        })
    }

    private updatePassengerWithFirstPassenger(): void {
        const x = this.reservationForm.value.passengers[0]
        this.retailSaleForm.patchValue({
            passenger: x != undefined ? x.lastname + ' ' + x.firstname : ''
        })
    }

    private updateVatPercentAfterShipOwnerSelection(value: any): void {
        this.retailSaleForm.patchValue({
            vatPercent: value.vatPercent
        })
    }

    private doNewOrEditRetailSaleTasks(): void {
        if (this.retailSaleForm.value.reservationId == '') {
            this.isNewRetailSale = true
            this.updatePassengerWithFirstPassenger()
            this.updateRetailSaleFormWithTripDate()
            this.updateRetailSaleFormWithPax()
            this.updatePaymentMethodWithDefaultValue()
        }
    }

    //#endregion

    //#region getters

    get refNo(): AbstractControl {
        return this.reservationForm.get('refNo')
    }

    get reservationDate(): AbstractControl {
        return this.reservationForm.get('date')
    }

    get destination(): AbstractControl {
        return this.reservationForm.get('destination')
    }

    get customer(): AbstractControl {
        return this.reservationForm.get('customer')
    }

    get pickupPoint(): AbstractControl {
        return this.reservationForm.get('pickupPoint')
    }

    get ticketNo(): AbstractControl {
        return this.reservationForm.get('ticketNo')
    }

    get adults(): AbstractControl {
        return this.reservationForm.get('adults')
    }

    get kids(): AbstractControl {
        return this.reservationForm.get('kids')
    }

    get free(): AbstractControl {
        return this.reservationForm.get('free')
    }

    get totalPax(): AbstractControl {
        return this.reservationForm.get('totalPax')
    }

    get email(): AbstractControl {
        return this.reservationForm.get('email')
    }

    get phones(): AbstractControl {
        return this.reservationForm.get('phones')
    }

    get remarks(): AbstractControl {
        return this.reservationForm.get('remarks')
    }

    get driver(): AbstractControl {
        return this.reservationForm.get('driver')
    }

    get ship(): AbstractControl {
        return this.reservationForm.get('ship')
    }

    get port(): AbstractControl {
        return this.reservationForm.get('port')
    }

    get portAlternate(): AbstractControl {
        return this.reservationForm.get('portAlternate')
    }

    get postAt(): AbstractControl {
        return this.reservationForm.get('postAt')
    }

    get postUser(): AbstractControl {
        return this.reservationForm.get('postUser')
    }

    get putAt(): AbstractControl {
        return this.reservationForm.get('putAt')
    }

    get putUser(): AbstractControl {
        return this.reservationForm.get('putUser')
    }

    get saleDate(): AbstractControl {
        return this.retailSaleForm.get('date')
    }

    get tripDate(): AbstractControl {
        return this.retailSaleForm.get('tripDate')
    }

    get shipOwner(): AbstractControl {
        return this.retailSaleForm.get('shipOwner')
    }

    get documentType(): AbstractControl {
        return this.retailSaleForm.get('documentType')
    }

    get paymentMethod(): AbstractControl {
        return this.retailSaleForm.get('paymentMethod')
    }

    get passenger(): AbstractControl {
        return this.retailSaleForm.get('passenger')
    }

    get retailSaleAdults(): AbstractControl {
        return this.retailSaleForm.get('adults')
    }

    get adultsPrice(): AbstractControl {
        return this.retailSaleForm.get('adultsPrice')
    }

    get retailSaleKids(): AbstractControl {
        return this.retailSaleForm.get('kids')
    }

    get kidsPrice(): AbstractControl {
        return this.retailSaleForm.get('kidsPrice')
    }

    //#endregion

}
