import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { GenderReadDto } from '../classes/dtos/gender-read-dto'
import { GenderService } from '../classes/services/gender.service'
import { GenderWriteDto } from '../classes/dtos/gender-write-dto'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'gender-form',
    templateUrl: './gender-form.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css']
})

export class GenderFormComponent {

    //#region common #8

    private record: GenderReadDto
    private recordId: number
    public feature = 'genderForm'
    public featureIcon = 'genders'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/genders'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private genderService: GenderService, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

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
                this.genderService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('genders', this.form.value.id)
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

    private flattenForm(): GenderWriteDto {
        return {
            id: this.form.value.id,
            description: this.form.value.description,
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
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['genderForm']
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
            isActive: true,
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
                description: this.record.description,
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

    private saveRecord(gender: GenderWriteDto): void {
        this.genderService.save(gender).subscribe({
            next: (response) => {
                this.dexieService.update('genders', { 'id': parseInt(response.id), 'description': gender.description, 'isActive': gender.isActive })
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

    get isActive(): AbstractControl {
        return this.form.get('isActive')
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
