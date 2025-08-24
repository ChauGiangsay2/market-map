import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputOtpModule } from 'primeng/inputotp';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';

import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';

import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitButtonModule } from 'primeng/splitbutton';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    // begin primeng buttons
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    // end primeng buttons

    // begin primeNg form
    AutoCompleteModule,
    SelectButtonModule,
    CalendarModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ColorPickerModule,
    DropdownModule,
    EditorModule,
    FloatLabelModule,
    FileUploadModule,
    InputTextareaModule,
    IconFieldModule,
    InputSwitchModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputOtpModule,

    KeyFilterModule,
    KnobModule,

    ListboxModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    SliderModule,
    TreeSelectModule,
    ToggleButtonModule,
    ToastModule,
    // end primeNg form
  ],
  exports: [
    // begin primeng buttons
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    // end primeng buttons

    // begin primeNg form
    AutoCompleteModule,
    SelectButtonModule,
    CalendarModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ColorPickerModule,
    DropdownModule,
    EditorModule,
    FloatLabelModule,
    FileUploadModule,
    InputTextareaModule,
    IconFieldModule,
    InputSwitchModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputOtpModule,
    KeyFilterModule,
    KnobModule,
    ListboxModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,

    SliderModule,
    TreeSelectModule,
    ToggleButtonModule,
    ToastModule,

    // end primeNg form
  ],
})
export class PrimeNgFormModule {}
