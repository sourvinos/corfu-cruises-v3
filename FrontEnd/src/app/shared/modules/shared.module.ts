import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { PrimeNgModule } from './primeng.module'
import { RouterModule } from '@angular/router'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
// Custom
import { CriteriaFieldsetCheckboxesComponent } from '../components/criteria-fieldset-checkboxes/criteria-fieldset-checkboxes.component'
import { CriteriaFieldsetRadiosComponent } from '../components/criteria-fieldset-radios/criteria-fieldset-radios.component'
import { CriteriaFieldsetWeekdaysComponent } from '../components/criteria-fieldset-weekdays/criteria-fieldset-weekdays.component'
import { CriteriaPanelComponent } from '../components/criteria-panel/criteria-panel.component'
import { DatePickerComponent } from '../components/date-picker/date-picker.component'
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
import { MetadataPanelComponent } from '../components/metadata-panel/metadata-panel.component'
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component'
import { MonthSelectorComponent } from '../components/month-selector/month-selector.component'
import { PadNumberPipe } from '../pipes/pad-number.pipe'
import { ParametersMenuComponent } from '../components/top-bar-wrapper/parameters-menu/parameters-menu.component'
import { PrettyPrintPipe } from '../pipes/json-pretty.pipe'
import { ReplaceZeroPipe } from '../pipes/replace-zero.pipe'
import { SafeStylePipe } from '../pipes/safe-style.pipe'
import { TableTotalFilteredRecordsComponent } from '../components/table-total-filtered-records/table-total-filtered-records.component'
import { ThemeGroupSelectorComponent } from '../components/top-bar-wrapper/theme-group-selector/theme-group-selector.component'
import { ThemeMenuComponent } from './../components/top-bar-wrapper/theme-menu/theme-menu.component'
import { TrimStringPipe } from './../pipes/string-trim.pipe'
import { YearSelectorComponent } from '../components/year-selector/year-selector.component'

@NgModule({
    declarations: [
        CriteriaFieldsetCheckboxesComponent,
        CriteriaFieldsetRadiosComponent,
        CriteriaFieldsetWeekdaysComponent,
        CriteriaPanelComponent,
        DatePickerComponent,
        DateRangePickerComponent,
        EmojiDirective,
        HomeButtonAndTitleComponent,
        InputMaxLengthDirective,
        InputTabStopDirective,
        LanguageMenuComponent,
        LoadingSpinnerComponent,
        LogoComponent,
        MainFooterComponent,
        MetadataPanelComponent,
        ModalDialogComponent,
        MonthSelectorComponent,
        PadNumberPipe,
        ParametersMenuComponent,
        PrettyPrintPipe,
        ReplaceZeroPipe,
        SafeStylePipe,
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
        CriteriaFieldsetWeekdaysComponent,
        CriteriaPanelComponent,
        DatePickerComponent,
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
        MetadataPanelComponent,
        MonthSelectorComponent,
        PadNumberPipe,
        ParametersMenuComponent,
        PrettyPrintPipe,
        PrimeNgModule,
        ReactiveFormsModule,
        ReplaceZeroPipe,
        RouterModule,
        RouterModule,
        TableTotalFilteredRecordsComponent,
        ThemeGroupSelectorComponent,
        ThemeMenuComponent,
        TrimStringPipe,
        YearSelectorComponent,
        ZXingScannerModule,
    ]
})

export class SharedModule { }
