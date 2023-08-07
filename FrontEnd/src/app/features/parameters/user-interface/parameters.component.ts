import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { ParametersReadDto } from '../classes/models/parameters-read.dto'
import { ParametersService } from '../classes/services/parameters.service'
import { ParametersWriteDto } from '../classes/models/parameters-write.dto'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'parameters',
    templateUrl: './parameters.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css', './parameters.component.css']
})

export class ParametersComponent {

    //#region variables

    private record: ParametersReadDto
    private subscription = new Subscription()
    public feature = 'parameters'
    public featureIcon = 'parameters'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/home'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private dialogService: ModalDialogService, private router: Router, private parametersService: ParametersService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.getRecord()
        this.populateFields()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    canDeactivate(): boolean {
        return this.helperService.goBackFromForm(this.form)
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    //#endregion

    //#region private methods

    private cleanup(): void {
        this.subscription.unsubscribe()
    }

    private flattenForm(): ParametersWriteDto {
        return {
            id: this.form.value.id,
            closingTime: this.form.value.closingTime
        }
    }

    private getRecord(): Promise<any> {
        return new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data[this.feature]
            if (formResolved.error == null) {
                this.record = formResolved.record.body
                resolve(this.record)
            } else {
                this.dialogService.open(this.messageSnackbarService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
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
            closingTime: ['00:00', [Validators.required, ValidationService.isTime]],
            user: [''],
            lastUpdate: ['']
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                closingTime: this.record.closingTime,
                user: this.record.user,
                lastUpdate: this.record.lastUpdate
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(parameters: ParametersWriteDto): void {
        this.parametersService.save(parameters).subscribe({
            next: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false)
            }
        })
    }

    //#endregion

    //#region getters

    get closingTime(): AbstractControl {
        return this.form.get('closingTime')
    }

    get user(): AbstractControl {
        return this.form.get('user')
    }

    get lastUpdate(): AbstractControl {
        return this.form.get('lastUpdate')
    }

    //#endregion

}
