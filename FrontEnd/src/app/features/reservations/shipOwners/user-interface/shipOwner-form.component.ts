import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ShipOwnerReadDto } from '../classes/dtos/shipOwner-read-dto'
import { ShipOwnerService } from '../classes/services/shipOwner.service'
import { ShipOwnerWriteDto } from '../classes/dtos/shipOwner-write-dto'

@Component({
    selector: 'ship-owner-form',
    templateUrl: './shipOwner-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class ShipOwnerFormComponent {

    //#region common #8

    private record: ShipOwnerReadDto
    private recordId: number
    public feature = 'shipOwnerForm'
    public featureIcon = 'shipOwners'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/shipOwners'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router, private shipOwnerService: ShipOwnerService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.shipOwnerService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('shipOwners', this.form.value.id)
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

    //#endregion

    //#region private methods

    private flattenForm(): ShipOwnerWriteDto {
        return {
            id: this.form.value.id,
            description: this.form.value.description,
            profession: this.form.value.profession,
            address: this.form.value.address,
            taxNo: this.form.value.taxNo,
            city: this.form.value.city,
            phones: this.form.value.phones,
            email: this.form.value.email,
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
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['shipOwnerForm']
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
            id: 0,
            description: ['', [Validators.required, Validators.maxLength(128)]],
            profession: ['', [Validators.maxLength(128)]],
            address: ['', [Validators.maxLength(128)]],
            taxNo: ['', [Validators.maxLength(128)]],
            city: ['', [Validators.maxLength(128)]],
            phones: ['', [Validators.maxLength(128)]],
            email: ['', [Validators.email, Validators.maxLength(128)]],
            isActive: true,
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateFields(): void {
        if (this.recordId != undefined) {
            this.form.setValue({
                id: this.record.id,
                description: this.record.description,
                profession: this.record.profession,
                address: this.record.address,
                taxNo: this.record.taxNo,
                city: this.record.city,
                phones: this.record.phones,
                email: this.record.email,
                isActive: this.record.isActive,
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

    private saveRecord(shipOwner: ShipOwnerWriteDto): void {
        this.shipOwnerService.save(shipOwner).subscribe({
            next: (response) => {
                this.dexieService.update('shipOwners', { 'id': parseInt(response.id), 'description': shipOwner.description, 'isActive': shipOwner.isActive })
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
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

    //#endregion

    //#region getters

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get profession(): AbstractControl {
        return this.form.get('profession')
    }

    get address(): AbstractControl {
        return this.form.get('address')
    }

    get taxNo(): AbstractControl {
        return this.form.get('taxNo')
    }

    get city(): AbstractControl {
        return this.form.get('city')
    }

    get phones(): AbstractControl {
        return this.form.get('phones')
    }

    get email(): AbstractControl {
        return this.form.get('email')
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
