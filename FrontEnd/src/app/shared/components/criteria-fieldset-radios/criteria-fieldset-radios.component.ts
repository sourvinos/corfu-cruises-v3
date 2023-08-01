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

    public isSelected(): boolean {
        return typeof this.selected === 'object' && this.selected.length != 0
    }

    public onRowSelect(): void {
        this.updateSelected()
        this.exportSelected()
    }

    //#endregion

    //#region private methods

    private exportSelected(): void {
        this.outputSelected.emit(new Array(1).fill(this.selected))
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            selected: ['', Validators.required]
        })
    }

    private updateSelected(): void {
        this.form.patchValue({
            selected: this.selected
        })
    }

    //#endregion

}
