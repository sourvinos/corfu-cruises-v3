import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
// Custom
import { MessageLabelService } from '../../services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'

@Component({
    selector: 'search-byRefNo',
    templateUrl: './search-byRefNo.component.html',
    styleUrls: ['./search-byRefNo.component.css'],
})

export class SearchByRefNoComponent {

    //#region variables

    private feature = 'searchByRefBox'
    private isFormVisible: boolean
    public form: FormGroup

    //#endregion

    constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setInitialFormVisibility()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getIconColor(): string {
        return this.localStorageService.getItem('theme') == 'light' ? 'black' : 'white'
    }

    public isLoggedIn(): boolean {
        return this.sessionStorageService.getItem('userId') ? true : false
    }

    public onSearchByRefNo(): void {
        const refNo = this.form.value.searchByRefNo
        this.router.navigate(['reservations/refNo', refNo])
        this.onToggleFormVisibility()
    }

    public onToggleFormVisibility(): void {
        this.isFormVisible = this.isFormVisible == undefined || this.isFormVisible == false ? true : false
        if (this.isFormVisible) {
            document.getElementById('search-form-wrapper').style.left = '-5rem'
            document.getElementById('search-form-wrapper').classList.add('is-visible')
        } else {
            document.getElementById('search-form-wrapper').style.left = '0'
            document.getElementById('search-form-wrapper').classList.remove('is-visible')
        }
    }

    public getFormIcon(): string {
        return this.isFormVisible == false || this.isFormVisible == undefined
            ? 'search'
            : 'close'
    }

    public getFormVisibility(): boolean {
        return this.isFormVisible
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            searchByRefNo: ['', [Validators.required]],
        })
    }

    private setInitialFormVisibility(): void {
        this.isFormVisible = false
    }

    //#endregion

}
