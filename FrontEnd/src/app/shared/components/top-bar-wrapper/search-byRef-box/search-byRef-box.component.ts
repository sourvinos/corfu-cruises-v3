import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
// Custom
import { MessageLabelService } from '../../../services/message-label.service'

@Component({
    selector: 'search-byRef-box',
    templateUrl: './search-byRef-box.component.html',
    styleUrls: ['./search-byRef-box.component.css'],
})

export class SearchByRefBoxComponent {

    //#region variables

    private feature = 'searchByRefBox'
    public form: FormGroup

    //#endregion

    constructor(private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onSearchByRefNo(): void {
        const refNo = this.form.value.searchByRefNo
        this.router.navigate(['reservations/refNo', refNo])
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            searchByRefNo: ['', [Validators.required]],
        })
    }

    //#endregion

}
