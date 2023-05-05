import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Title } from '@angular/platform-browser'
// Custom
import { AccountService } from '../../../shared/services/account.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { HelperService, indicate } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['../../../../assets/styles/forms.css', '../../../shared/styles/login-forgot-reset-password.css', './login-form.component.css']
})

export class LoginFormComponent {

    //#region variables

    public feature = 'loginForm'
    public featureIcon = 'login'
    public form: FormGroup
    public icon = ''
    public input: InputTabStopDirective
    public parentUrl = null

    public hidePassword = true
    public isLoading = new Subject<boolean>()

    //#endregion

    constructor(private accountService: AccountService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private router: Router, private titleService: Title) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.clearStoredVariables()
        this.focusOnField()
        this.setWindowTitle()
        this.checkScreenResolution()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onForgotPassword(): void {
        this.router.navigate(['forgotPassword'])
    }

    public onLogin(): void {
        this.accountService.login(this.form.value.username, this.form.value.password).pipe(indicate(this.isLoading)).subscribe({
            complete: () => {
                this.goHome()
            },
            error: (errorFromInterceptor) => {
                this.showError(errorFromInterceptor)
            }
        })
    }

    //#endregion

    //#region private methods

    private checkScreenResolution(): void {
        if (window.screen.width < 1280 || window.screen.height < 800) {
            this.dialogService.open(this.messageSnackbarService.resolutionWarning(), 'warning', ['ok'])
        }
    }

    private clearStoredVariables(): void {
        this.accountService.clearSessionStorage()
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private goHome(): void {
        this.router.navigate(['/home'])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            username: [environment.login.username, Validators.required],
            password: [environment.login.password, Validators.required],
            noRobot: [environment.login.noRobot, Validators.requiredTrue]
        })
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle())
    }

    private showError(error: any): void {
        switch (error.status) {
            case 0:
                this.dialogService.open(this.messageSnackbarService.noContactWithServer(), 'error', ['ok'])
                break
            case 401:
                this.dialogService.open(this.messageSnackbarService.authenticationFailed(), 'error', ['ok'])
                break
        }
    }

    //#endregion

    //#region getters

    get username(): AbstractControl {
        return this.form.get('username')
    }

    get password(): AbstractControl {
        return this.form.get('password')
    }

    //#endregion

}