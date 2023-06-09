import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// Custom
import { EmojiService } from '../../services/emoji.service'
import { MessageLabelService } from '../../services/message-label.service'
import { SimpleEntity } from '../../classes/simple-entity'

@Component({
    selector: 'criteria-fieldset-radios',
    templateUrl: './criteria-fieldset-radios.component.html',
    styleUrls: ['criteria-fieldset-radios.component.css']
})

export class CriteriaFieldsetRadiosComponent {

    //#region variables

    @Input() feature: string
    @Input() caption: string
    @Input() array: SimpleEntity[] = []
    @Input() selected: SimpleEntity[] = []
    @Input() arrayName: string
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

    public getSelected(): boolean {
        return this.selected == null || this.selected.length == 0 ? false : true
    }

    public onRowSelect(event: any): void {
        this.updateSelected(event)
        this.exportSelected()
    }

    public onRowUnselect(): void {
        this.updateSelected()
        this.exportSelected()
    }

    //#endregion

    //#region private methods

    private exportSelected(): void {
        if (this.selected) {
            const x = []
            x.push(this.selected)
            this.outputSelected.emit(x)
        } else {
            this.outputSelected.emit([])
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            selected: ['', Validators.required]
        })
    }

    private updateSelected(event?: any): void {
        event != undefined
            ? this.form.patchValue({ selected: event.data })
            : this.form.patchValue({ selected: '' })
    }

    //#endregion

}
