import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MatDialog } from '@angular/material/dialog'
import { map, startWith } from 'rxjs/operators'
// Custom
import { BoardingPassService } from '../../classes/boarding-pass/services/boarding-pass.service'
import { CachedReservationDialogComponent } from '../cached-reservation-dialog/cached-reservation-dialog.component'
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { CustomerActiveVM } from '../../../customers/classes/view-models/customer-active-vm'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DestinationActiveVM } from 'src/app/features/destinations/classes/view-models/destination-active-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DriverActiveVM } from '../../../drivers/classes/view-models/driver-active-vm'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { PickupPointDropdownVM } from 'src/app/features/pickupPoints/classes/view-models/pickupPoint-dropdown-vm'
import { PortActiveVM } from 'src/app/features/ports/classes/view-models/port-active-vm'
import { ReservationHelperService } from '../../classes/services/reservation.helper.service'
import { ReservationHttpService } from '../../classes/services/reservation.http.service'
import { ReservationReadDto } from '../../classes/dtos/form/reservation-read-dto'
import { ReservationWriteDto } from '../../classes/dtos/form/reservation-write-dto'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ValidationService } from './../../../../shared/services/validation.service'

@Component({
    selector: 'reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './reservation-form.component.css']
})

export class ReservationFormComponent {

    //#region variables

    private record: ReservationReadDto
    private recordId: string
    public feature = 'reservationForm'
    public featureIcon = 'reservations'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public isAutoCompleteDisabled = true
    public parentUrl = ''

    public arrowIcon = new BehaviorSubject('arrow_drop_down')
    public dropdownCustomers: Observable<CustomerActiveVM[]>
    public dropdownDestinations: Observable<DestinationActiveVM[]>
    public dropdownDrivers: Observable<DriverActiveVM[]>
    public dropdownPickupPoints: Observable<PickupPointDropdownVM[]>
    public dropdownPorts: Observable<PortActiveVM[]>
    public dropdownShips: Observable<DriverActiveVM[]>

    public isNewRecord: boolean
    public passengerDifferenceColor: string
    public isReservationTabVisible: boolean
    public isPassengersTabVisible: boolean
    public isMiscTabVisible: boolean

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private boardingPassService: BoardingPassService, private cryptoService: CryptoService, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialog: MatDialog, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private reservationHelperService: ReservationHelperService, private reservationService: ReservationHttpService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.updateFieldsAfterEmptyPickupPoint()
        this.setRecordId()
        this.setNewRecord()
        this.doNewOrEditTasks()
        this.doPostInitTasks()
        this.setTabTitle()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(subject: { description: any }): any {
        return subject ? subject.description : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public doPaxCalculations(): void {
        this.calculateTotalPax()
        this.getPassengerDifferenceColor()
    }

    public doTasksAfterPassengerFormIsClosed(passengers: any): void {
        this.patchFormWithPassengers(passengers)
        this.saveCachedReservation()
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getEmoji(): string {
        return this.emojiService.getEmoji('green')
    }
    
    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getPassengerDifferenceColor(element?: any): void {
        this.passengerDifferenceColor = this.reservationHelperService.getPassengerDifferenceIcon(element, this.form.value.totalPax, this.form.value.passengers.length)
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    public isAdminOrNewRecord(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' || this.recordId == null
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

    public onDelete(): void {
        this.dialogService.open(this.messageSnackbarService.confirmDelete(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.reservationService.delete(this.form.value.reservationId).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
                        this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                        this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onEmailBoardingPass(): void {
        if (this.reservationHelperService.totalPaxShouldBeEqualToPassengerCount(this.form.value.totalPax, this.form.value.passengers.length)) {
            if (this.reservationHelperService.emailShouldBeValid(this.form.value.email)) {
                this.boardingPassService.emailBoardingPass(this.form.value.reservationId).subscribe({
                    next: () => {
                        this.helperService.doPostSaveFormTasks(this.messageSnackbarService.emailSent(), 'success', this.parentUrl, this.form, false, false)
                    },
                    error: (errorFromInterceptor) => {
                        this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false, false)
                    }
                })
            } else {
                this.dialogService.open(this.messageSnackbarService.emailShouldBeValid(), 'error', ['ok'])
            }
        } else {
            this.dialogService.open(this.messageSnackbarService.totalPaxShouldBeEqualToPassengerCount(), 'error', ['ok'])
        }
    }

    public onPrintBoardingPass(): void {
        if (this.reservationHelperService.totalPaxShouldBeEqualToPassengerCount(this.form.value.totalPax, this.form.value.passengers.length)) {
            this.boardingPassService.printBoardingPass(this.boardingPassService.createBoardingPass(this.form.value))
        } else {
            this.dialogService.open(this.messageSnackbarService.totalPaxShouldBeEqualToPassengerCount(), 'error', ['ok'])
        }
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public onShowCachedReservationDialog(): void {
        const dialogRef = this.dialog.open(CachedReservationDialogComponent, {
            width: '31rem',
            height: '34rem',
            panelClass: 'dialog',
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                if (result.option.id == 1) {
                    this.getCachedReservation()
                    this.populateFields()
                    this.getPassengerDifferenceColor()
                }
                if (result.option.id == 2) {
                    this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                    this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
                }
            }
        })
    }

    public onShowMiscTab(): void {
        this.isReservationTabVisible = false
        this.isPassengersTabVisible = false
        this.isMiscTabVisible = true
    }

    public onShowPassengersTab(): void {
        this.isReservationTabVisible = false
        this.isPassengersTabVisible = true
        this.isMiscTabVisible = false
    }

    public onShowReservationTab(): void {
        this.isReservationTabVisible = true
        this.isPassengersTabVisible = false
        this.isMiscTabVisible = false
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    public updateFieldsAfterPickupPointSelection(value: PickupPointDropdownVM): void {
        this.form.patchValue({
            exactPoint: value.exactPoint,
            time: value.time,
            port: {
                'id': value.port.id,
                'description': value.port.description
            }
        })
    }

    //#endregion

    //#region private methods

    private calculateTotalPax(): void {
        const totalPax = parseInt(this.form.value.adults, 10) + parseInt(this.form.value.kids, 10) + parseInt(this.form.value.free, 10)
        this.form.patchValue({ totalPax: Number(totalPax) ? totalPax : 0 })
    }

    private cleanup(): void {
        this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
    }

    private doNewOrEditTasks(): void {
        if (this.isNewRecord) {
            this.getStoredDate()
            this.getStoredDestination()
            this.getPassengerDifferenceColor()
        } else {
            this.getRecord()
            this.populateFields()
            this.getPassengerDifferenceColor()
        }
    }

    private doPostInitTasks(): void {
        this.getLinkedCustomer()
        this.populateDropdowns()
        this.setLocale()
        this.setParentUrl()
        this.subscribeToInteractionService()
        this.updateTabVisibility()
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): ReservationWriteDto {
        return this.reservationHelperService.flattenForm(this.form.value)
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getLinkedCustomer(): void {
        if (this.isNewRecord && this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'false') {
            this.reservationHelperService.getLinkedCustomer().then((response => {
                if (response != undefined) {
                    this.form.patchValue({
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
                this.dialogService.open(this.messageSnackbarService.filterResponse(new Error('500')), 'error', ['ok'])
                this.goBack()
            }
        })
    }

    private getCachedReservation(): void {
        this.record = JSON.parse(this.localStorageService.getItem('reservation'))
    }

    private getStoredDate(): void {
        if (this.sessionStorageService.getItem('date') != '') {
            const x = this.sessionStorageService.getItem('date')
            this.form.patchValue({
                'date': x
            })
        }
    }

    private getStoredDestination(): void {
        if (this.sessionStorageService.getItem('destination') != '') {
            const x = JSON.parse(this.sessionStorageService.getItem('destination'))
            this.form.patchValue({
                'destination': {
                    'id': x.id,
                    'description': x.description
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

    private initForm(): void {
        this.form = this.formBuilder.group({
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
            ship: '',
            ticketNo: ['', [Validators.required, Validators.maxLength(128)]],
            email: ['', [Validators.maxLength(128), Validators.email]],
            phones: ['', Validators.maxLength(128)],
            remarks: ['', Validators.maxLength(128)],
            imageBase64: '',
            passengers: [[]],
            user: [''],
            lastUpdate: ['']
        })
    }

    private patchFormWithPassengers(passengers: any): void {
        this.form.patchValue({ passengers: passengers })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customers', 'dropdownCustomers', 'customer', 'description', 'description')
        this.populateDropdownFromDexieDB('destinations', 'dropdownDestinations', 'destination', 'description', 'description')
        this.populateDropdownFromDexieDB('drivers', 'dropdownDrivers', 'driver', 'description', 'description')
        this.populateDropdownFromDexieDB('pickupPoints', 'dropdownPickupPoints', 'pickupPoint', 'description', 'description')
        this.populateDropdownFromDexieDB('ports', 'dropdownPorts', 'port', 'description', 'description')
        this.populateDropdownFromDexieDB('ships', 'dropdownShips', 'ship', 'description', 'description')
    }

    private populateDropdownFromDexieDB(table: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(table).orderBy(orderBy).toArray().then((response) => {
            this[table] = response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(table, modelProperty, value)))
        })
    }

    private populateFields(): void {
        this.form.setValue({
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
            user: this.record.user,
            lastUpdate: this.record.lastUpdate
        })
    }

    private saveRecord(reservation: ReservationWriteDto): void {
        this.reservationService.saveReservation(reservation).subscribe({
            next: (response) => {
                const date = this.dateHelperService.formatDateToIso(new Date(this.form.value.date))
                this.sessionStorageService.saveItem('date', date)
                this.parentUrl = '/reservations/date/' + date
                this.helperService.doPostSaveFormTasks('RefNo: ' + response.message, 'success', this.parentUrl, this.form)
                this.localStorageService.deleteItems([{ 'item': 'reservation', 'when': 'always' },])
                this.sessionStorageService.deleteItems([{ 'item': 'nationality', 'when': 'always' }])
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false, false)
            }
        })
    }

    private saveCachedReservation(): void {
        this.localStorageService.saveItem('reservation', JSON.stringify(this.reservationHelperService.createCachedReservation(this.form.value)))
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

    private updateFieldsAfterEmptyPickupPoint(): void {
        this.form.get('pickupPoint').valueChanges.subscribe(value => {
            if (value == '') {
                this.form.patchValue({
                    exactPoint: '',
                    time: '',
                    port: ''
                })
            }
        })
    }

    private updateTabVisibility(): void {
        this.isReservationTabVisible = true
        this.isPassengersTabVisible = false
    }

    //#endregion

    //#region getters

    get refNo(): AbstractControl {
        return this.form.get('refNo')
    }

    get date(): AbstractControl {
        return this.form.get('date')
    }

    get destination(): AbstractControl {
        return this.form.get('destination')
    }

    get customer(): AbstractControl {
        return this.form.get('customer')
    }

    get pickupPoint(): AbstractControl {
        return this.form.get('pickupPoint')
    }

    get ticketNo(): AbstractControl {
        return this.form.get('ticketNo')
    }

    get adults(): AbstractControl {
        return this.form.get('adults')
    }

    get kids(): AbstractControl {
        return this.form.get('kids')
    }

    get free(): AbstractControl {
        return this.form.get('free')
    }

    get totalPax(): AbstractControl {
        return this.form.get('totalPax')
    }

    get email(): AbstractControl {
        return this.form.get('email')
    }

    get phones(): AbstractControl {
        return this.form.get('phones')
    }

    get remarks(): AbstractControl {
        return this.form.get('remarks')
    }

    get driver(): AbstractControl {
        return this.form.get('driver')
    }

    get ship(): AbstractControl {
        return this.form.get('ship')
    }

    get port(): AbstractControl {
        return this.form.get('port')
    }

    get user(): AbstractControl {
        return this.form.get('user')
    }

    get lastUpdate(): AbstractControl {
        return this.form.get('lastUpdate')
    }

    //#endregion

}
