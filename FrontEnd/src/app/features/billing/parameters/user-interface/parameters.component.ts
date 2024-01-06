import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ParametersReadDto } from '../classes/models/parameters-read.dto'
import { ParametersService } from '../classes/services/parameters.service'
import { ParametersWriteDto } from '../classes/models/parameters-write.dto'

@Component({
    selector: 'parameters',
    templateUrl: './parameters.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class ParametersComponent {

    //#region common form variables

    private record: ParametersReadDto
    public feature = 'parameters'
    public featureIcon = 'parameters'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/home'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private parametersService: ParametersService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.getRecord()
        this.populateFields()
        this.setSidebarsHeight()
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
        return this.messageLabelService.getDescription('billing-' + this.feature, id)
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    //#endregion

    //#region private methods

    private flattenForm(): ParametersWriteDto {
        return {
            id: this.form.value.id,
            isAadeLive: this.form.value.isAadeLive,
            aadeDemoUrl: this.form.value.aadeDemoUrl,
            aadeDemoUsername: this.form.value.aadeDemoUsername,
            aadeDemoApiKey: this.form.value.aadeDemoApiKey,
            aadeLiveUrl: this.form.value.aadeLiveUrl,
            aadeLiveUsername: this.form.value.aadeLiveUsername,
            aadeLiveApiKey: this.form.value.aadeLiveApiKey,
            putAt: this.form.value.putAt
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        return new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data[this.feature]
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

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: [''],
            aadeDemoUrl: ['', [Validators.required, Validators.maxLength(128)]],
            aadeDemoUsername: ['', [Validators.required, Validators.maxLength(128)]],
            aadeDemoApiKey: ['', [Validators.required, Validators.maxLength(128)]],
            aadeLiveUrl: ['', [Validators.required, Validators.maxLength(128)]],
            aadeLiveUsername: ['', [Validators.required, Validators.maxLength(128)]],
            aadeLiveApiKey: ['', [Validators.required, Validators.maxLength(128)]],
            isAadeLive: true,
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
                isAadeLive: this.record.isAadeLive,
                aadeDemoUrl: this.record.aadeDemoUrl,
                aadeDemoUsername: this.record.aadeDemoUsername,
                aadeDemoApiKey: this.record.aadeDemoApiKey,
                aadeLiveUrl: this.record.aadeLiveUrl,
                aadeLiveUsername: this.record.aadeLiveUsername,
                aadeLiveApiKey: this.record.aadeLiveApiKey,
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

    private saveRecord(parameters: ParametersWriteDto): void {
        this.parametersService.save(parameters).subscribe({
            next: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setSidebarsHeight(): void {
        this.helperService.setSidebarsTopMargin('0')
    }

    //#endregion

    //#region getters

    get aadeDemoUrl(): AbstractControl {
        return this.form.get('aadeDemoUrl')
    }

    get aadeDemoUsername(): AbstractControl {
        return this.form.get('aadeDemoUsername')
    }

    get aadeDemoApiKey(): AbstractControl {
        return this.form.get('aadeDemoApiKey')
    }

    get aadeLiveUrl(): AbstractControl {
        return this.form.get('aadeLiveUrl')
    }

    get aadeLiveUsername(): AbstractControl {
        return this.form.get('aadeLiveUsername')
    }

    get aadeLiveApiKey(): AbstractControl {
        return this.form.get('aadeLiveApiKey')
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
