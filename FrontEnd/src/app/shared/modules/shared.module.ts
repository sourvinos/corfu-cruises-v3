import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { PrimeNgModule } from './primeng.module'
import { RouterModule } from '@angular/router'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
// Custom
import { CriteriaFieldsetCheckboxesComponent } from '../components/criteria-fieldset-checkboxes/criteria-fieldset-checkboxes.component'
import { CriteriaFieldsetRadiosComponent } from '../components/criteria-fieldset-radios/criteria-fieldset-radios.component'
import { CriteriaPanelComponent } from '../components/criteria-panel/criteria-panel.component'
import { DatePickerWithOutLabelComponent } from '../components/date-picker-without-label/date-picker-without-label.component'
import { DateRangePickerComponent } from '../components/date-range-picker/date-range-picker.component'
import { EmojiDirective } from '../directives/emoji.directive'
import { HomeButtonAndTitleComponent } from '../components/home-button-and-title/home-button-and-title.component'
import { InputMaxLengthDirective } from '../directives/input-maxLength.directive'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/top-bar-wrapper/language-menu/language-menu.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { LogoComponent } from '../components/top-bar-wrapper/logo/logo.component'
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
import { ThemeGroupSelectorComponent } from '../components/top-bar-wrapper/theme-group-selector/theme-group-selector.component'
import { ThemeMenuComponent } from './../components/top-bar-wrapper/theme-menu/theme-menu.component'
import { TrimStringPipe } from './../pipes/string-trim.pipe'
import { YearSelectorComponent } from '../components/year-selector/year-selector.component'

@NgModule({
    declarations: [
        CriteriaFieldsetCheckboxesComponent,
        CriteriaFieldsetRadiosComponent,
        CriteriaPanelComponent,
        DatePickerWithOutLabelComponent,
        DateRangePickerComponent,
        EmojiDirective,
        HomeButtonAndTitleComponent,
        InputMaxLengthDirective,
        InputTabStopDirective,
        LanguageMenuComponent,
        LoadingSpinnerComponent,
        LogoComponent,
        MainFooterComponent,
        ModalDialogComponent,
        MonthSelectorComponent,
        PadNumberPipe,
        PrettyPrintPipe,
        ReplaceZeroPipe,
        SafeStylePipe,
        SettingsMenuComponent,
        TableTotalFilteredRecordsComponent,
        ThemeGroupSelectorComponent,
        ThemeMenuComponent,
        TrimStringPipe,
        YearSelectorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PrimeNgModule,
        ReactiveFormsModule,
        RouterModule,
        ZXingScannerModule,
    ],
    exports: [
        CommonModule,
        CriteriaFieldsetCheckboxesComponent,
        CriteriaFieldsetRadiosComponent,
        CriteriaPanelComponent,
        DatePickerWithOutLabelComponent,
        DateRangePickerComponent,
        EmojiDirective,
        FormsModule,
        HomeButtonAndTitleComponent,
        InputMaxLengthDirective,
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
        ThemeGroupSelectorComponent,
        ThemeMenuComponent,
        TrimStringPipe,
        YearSelectorComponent,
        ZXingScannerModule,
    ]
})

export class SharedModule { }
