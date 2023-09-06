import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
// Custom
import { MessageLabelService } from '../../services/message-label.service'

@Component({
    selector: 'metadata-panel',
    templateUrl: './metadata-panel.component.html',
    styleUrls: ['./metadata-panel.component.css']
})

export class MetadataPanelComponent {

    @Input() feature: string
    @Input() postUser: string
    @Input() postAt: string
    @Input() putUser: string
    @Input() putAt: string

    public form: FormGroup

    constructor(private formBuilder: FormBuilder, private messageLabelService: MessageLabelService) { }

    ngOnInit(): void {
        this.initForm()
        this.populateFields()
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateFields(): void {
        this.form.setValue({
            postAt: this.postAt,
            postUser: this.postUser,
            putAt: this.putAt,
            putUser: this.putUser
        })
    }

}
