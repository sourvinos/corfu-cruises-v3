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
import { Settings } from '../classes/models/settings'
import { SettingsService } from '../classes/services/settings.service'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css']
})

export class SettingsComponent {

    //#region variables

    private record: Settings
    private subscription = new Subscription()
    public feature = 'settings'
    public featureIcon = 'general-settings'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/home'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private dialogService: ModalDialogService, private router: Router, private settingsService: SettingsService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.getRecord()
        this.populateFields()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
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

    private flattenForm(): Settings {
        return {
            id: this.form.value.id,
            closingTime: this.form.value.closingTime
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        return new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data[this.feature]
            if (formResolved.error == null) {
                this.record = formResolved.record
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
            id: 0,
            closingTime: ['', [Validators.required, ValidationService.isTime]],
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                closingTime: this.record.closingTime
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(settings: Settings): void {
        this.settingsService.save(settings).subscribe({
            complete: () => {
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

    //#endregion

}
