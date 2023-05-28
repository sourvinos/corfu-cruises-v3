import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { PrimeNgModule } from './primeng.module'
import { RouterModule } from '@angular/router'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
// Custom
import { CriteriaPanelComponent } from '../components/criteria-panel/criteria-panel.component'
import { EmojiDirective } from '../directives/emoji.directive'
import { HomeButtonAndTitleComponent } from '../components/home-button-and-title/home-button-and-title.component'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/top-bar-wrapper/language-menu/language-menu.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { MainFooterComponent } from '../components/home/main-footer.component'
import { MaterialModule } from './material.module'
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component'
import { MonthSelectorComponent } from '../components/month-selector/month-selector.component'
import { PadNumberPipe } from '../pipes/pad-number.pipe'
import { PrettyPrintPipe } from '../pipes/json-pretty.pipe'
import { ReplaceZeroPipe } from '../pipes/replace-zero.pipe'
import { SafeStylePipe } from '../pipes/safe-style.pipe'
import { SettingsMenuComponent } from '../components/top-bar-wrapper/settings-menu/settings-menu.component'
import { TableTotalFilteredRecordsComponent } from '../components/table-total-filtered-records/table-total-filtered-records.component'
import { ThemeMenuComponent } from './../components/top-bar-wrapper/theme-menu/theme-menu.component'
import { TrimStringPipe } from './../pipes/string-trim.pipe'
import { YearSelectorComponent } from '../components/year-selector/year-selector.component'
import { LogoComponent } from '../components/top-bar-wrapper/logo/logo.component'

@NgModule({
    declarations: [
        CriteriaPanelComponent,
        EmojiDirective,
        HomeButtonAndTitleComponent,
        InputTabStopDirective,
        LanguageMenuComponent,
        LogoComponent,
        LoadingSpinnerComponent,
        MainFooterComponent,
        ModalDialogComponent,
        MonthSelectorComponent,
        PadNumberPipe,
        PrettyPrintPipe,
        ReplaceZeroPipe,
        SafeStylePipe,
        SettingsMenuComponent,
        TableTotalFilteredRecordsComponent,
        ThemeMenuComponent,
        TrimStringPipe,
        YearSelectorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PrimeNgModule,
        RouterModule,
        ZXingScannerModule
    ],
    exports: [
        CommonModule,
        CriteriaPanelComponent,
        EmojiDirective,
        FormsModule,
        HomeButtonAndTitleComponent,
        InputTabStopDirective,
        LanguageMenuComponent,
        LoadingSpinnerComponent,
        LogoComponent,
        MainFooterComponent,
        MaterialModule,
        MonthSelectorComponent,
        PadNumberPipe,
        PrettyPrintPipe,
        PrimeNgModule,
        ReactiveFormsModule,
        ReplaceZeroPipe,
        RouterModule,
        RouterModule,
        SettingsMenuComponent,
        TableTotalFilteredRecordsComponent,
        ThemeMenuComponent,
        TrimStringPipe,
        YearSelectorComponent,
        ZXingScannerModule,
    ],
    entryComponents: [
        ModalDialogComponent
    ]
})

export class SharedModule { }
