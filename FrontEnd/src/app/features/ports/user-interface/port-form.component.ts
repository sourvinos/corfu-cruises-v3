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
import { PortReadDto } from '../classes/dtos/port-read-dto'
import { PortService } from '../classes/services/port.service'
import { PortWriteDto } from '../classes/dtos/port-write-vm'

@Component({
    selector: 'port-form',
    templateUrl: './port-form.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css']
})

export class PortFormComponent {

    //#region common #8

    private record: PortReadDto
    private recordId: number
    public feature = 'portForm'
    public featureIcon = 'ports'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/ports'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private portService: PortService, private router: Router) { }

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
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.portService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('ports', this.form.value.id)
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'success', this.parentUrl, this.form)
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

    private flattenForm(): PortWriteDto {
        return {
            id: this.form.value.id,
            abbreviation: this.form.value.abbreviation,
            description: this.form.value.description,
            stopOrder: this.form.value.stopOrder,
            isActive: this.form.value.isActive
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['portForm']
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
            abbreviation: ['', [Validators.required, Validators.maxLength(5)]],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            stopOrder: [0, [Validators.required, Validators.min(1), Validators.max(9)]],
            isActive: true,
            user: [''],
            lastUpdate: ['']
        })
    }

    private populateFields(): void {
        if (this.recordId != undefined) {
            this.form.setValue({
                id: this.record.id,
                abbreviation: this.record.abbreviation,
                description: this.record.description,
                stopOrder: this.record.stopOrder,
                isActive: this.record.isActive,
                user: this.record.user,
                lastUpdate: this.record.lastUpdate
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(port: PortWriteDto): void {
        this.portService.save(port).subscribe({
            next: (response) => {
                this.dexieService.update('ports', { 'id': parseInt(response.id), 'description': port.description, 'isActive': port.isActive })
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false, false)
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

    get abbreviation(): AbstractControl {
        return this.form.get('abbreviation')
    }

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get stopOrder(): AbstractControl {
        return this.form.get('stopOrder')
    }

    get user(): AbstractControl {
        return this.form.get('user')
    }

    get lastUpdate(): AbstractControl {
        return this.form.get('lastUpdate')
    }

    //#endregion

}
