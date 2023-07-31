import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
// Custom
import { EmojiService } from '../../services/emoji.service'
import { MessageLabelService } from '../../services/message-label.service'
import { SimpleEntity } from '../../classes/simple-entity'

@Component({
    selector: 'criteria-fieldset-checkboxes',
    templateUrl: './criteria-fieldset-checkboxes.component.html',
    styleUrls: ['criteria-fieldset-checkboxes.component.css']
})

export class CriteriaFieldsetCheckboxesComponent {

    //#region variables

    @Input() array: SimpleEntity[] = []
    @Input() caption: string
    @Input() feature: string
    @Input() selected: SimpleEntity[] = []
    @Output() outputSelected = new EventEmitter()

    public form: FormGroup

    //#endregion

    constructor(private emojiService: EmojiService, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onHeaderCheckboxToggle(event: any, formControl: string): void {
        this.updateSelected(formControl)
        this.exportSelected()
    }

    public onRowSelect(event: any, formControl: string): void {
        this.updateSelected(formControl)
        this.exportSelected()
    }

    public onRowUnselect(event: any, formControl: string): void {
        this.updateSelected(formControl)
        this.exportSelected()
    }

    //#endregion

    //#region private methods

    private exportSelected(): void {
        this.outputSelected.emit(this.selected)
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            selected: this.formBuilder.array([], Validators.required)
        })
    }

    private updateSelected(formControl: any): void {
        const x = this.form.controls[formControl] as FormArray
        this[formControl].forEach((element: any) => {
            x.push(new FormControl({
                'id': element.id,
                'description': element.description,
                'isActive': element.isActive
            }))
        })
    }

    //#endregion

}
