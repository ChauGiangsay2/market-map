import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNgFormModule } from './primeNg-form.module';
import { MessageService, ScrollerOptions, TreeNode } from 'primeng/api';
import { KeyFilterPattern } from 'primeng/keyfilter';
import { MFilesComponent } from './m-files/m-files.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';

@Component({
  selector: 'dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgFormModule,
    MFilesComponent,
    ErrorMessagesComponent,
  ],
  providers: [MessageService],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  getControl(keyOrPath: string): FormControl {
    return this.form.get(keyOrPath) as FormControl;
  }

  @Input({ required: true }) controls: IControl[] = [];
  @Input({ required: true }) form!: FormGroup;

  readonly TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    EMAIL: 'email',
    PASSWORD: 'password',
    CHECKBOX: 'checkbox',
    MULTIPLE_CHECKBOX: 'multiple-checkbox',
    SELECT: 'select',
    RADIO: 'radio',
    MULTI_SELECT: 'multi-select',
    TEXTAREA: 'textarea',
    COLOR: 'color',
    TIME_PICKER: 'time-picker',
    DATE_PICKER: 'date-picker',
    EDITOR: 'editor',
    RANGE: 'range',
    CHIP: 'chip',
    CURRENCY: 'currency',
    SWITCH: 'switch',
    OTP: 'otp',
    INPUT_MASK: 'input-mask',
    RATING: 'rating',
    AUTOCOMPLETE: 'autocomplete',
    SLIDER: 'slider',
    KNOB: 'knob',
    LISTBOX: 'listbox',
    TOGGLE_BUTTON: 'toggle-button',
    CASCADE_SELECT: 'cascade-select',
    KEYFILTER: 'keyfilter',
    SELECT_BUTTON: 'select-button',
    TREE_SELECT: 'tree-select',
    FILE_UPLOAD: 'file-upload',
  };

  readonly vitualScrollOptions: ScrollerOptions = {
    delay: 250,
    showLoader: false,
    lazy: true,
    // onLazyLoad: this.onLazyLoad.bind(this),
  };

  readonly defaultAttributeValue = {
    variant: 'filled',
    readonly: false,
    disabled: false,
    optionLabel: 'name',
    optionValue: 'id',
    filter: false,
    filterBy: 'name',
    filterMatchMode: 'contains',
    showClear: true,
    virtualScroll: false,
    vitualScrollItemSize: 38,
    virtualScrollOptions: this.vitualScrollOptions,
    loading: false,
    scrollHeight: '200px',
    resetFilterOnHide: true,
    locale: 'vi-VN',
    dateFormat: 'dd/mm/yy',
    hourFormat: '24',
    step: 1,
    optionGroupLabel: 'name',
    optionGroupChildren: 'items',
    optionDisabled: 'disabled',
    max: 100,
    addOnTab: true,
    addOnBlur: true,
    group: false,
    lazy: false,
    field: '',
    feedback: false,
    strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    mediumRegex:
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).',
    toggleMask: true,
    onLabel: 'On',
    offLabel: 'Off',
    urlApiFileUpload: 'https://www.primefaces.org/cdn/api/upload.php',
    accept: 'image/*',
    maxFileSize: 1000000,
    fileLimit: 20,
  } as {
    variant: 'filled' | 'outlined';
    readonly: boolean;
    disabled: boolean;
    optionLabel: string;
    optionValue: string;
    filter: boolean;
    filterBy: string;
    filterMatchMode:
      | 'contains'
      | 'startsWith'
      | 'endsWith'
      | 'equals'
      | 'notEquals'
      | 'in'
      | 'lt'
      | 'lte'
      | 'gt'
      | 'gte';
    showClear: boolean;
    virtualScroll: boolean;
    vitualScrollItemSize: number;
    virtualScrollOptions: ScrollerOptions;
    loading: boolean;
    scrollHeight: string;
    resetFilterOnHide: boolean;
    locale: string;
    dateFormat: string;
    hourFormat: '24' | '12';
    step: number;
    optionGroupLabel: string;
    optionGroupChildren: string | string[];
    optionDisabled: string;
    max: number;
    addOnTab: boolean;
    addOnBlur: boolean;
    group: boolean;
    lazy: boolean;
    field: string;
    feedback: boolean;
    strongRegex: string;
    mediumRegex: string;
    toggleMask: boolean;
    onLabel: string;
    offLabel: string;
    urlApiFileUpload: string;
    accept: string;
    maxFileSize: number;
    fileLimit: number | null;
  };

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.initForm();
  }

  onChange(event: any, control: IControl) {
    if (control.onChange) {
      control.onChange(event);
    }

    if (control.valueMatchFrom) {
      this.form.patchValue({
        [control.valueMatchFrom]: null,
      });
    }
  }

  onFilter(event: any, control: IControl) {
    if (control.onFilter) {
      control.onFilter(event);
    }
  }

  onResize(event: any, control: IControl) {
    if (control.onResize) {
      control.onResize(event);
    }
  }

  onComplete(event: any, control: IControl) {
    if (control.onComplete) {
      control.onComplete(event);
    }
  }

  onClear(event: any, control: IControl) {
    if (control.onClear) {
      control.onClear(event);
    }
  }

  onSlideEnd(event: any, control: IControl) {
    if (control.onSlideEnd) {
      control.onSlideEnd(event);
    }
  }

  onBlur(event: any, control: IControl) {
    if (control.onBlur) {
      control.onBlur(event);
    }
  }

  onRemove(event: any, control: IControl) {
    if (control.onRemove) {
      control.onRemove(event);
    }
  }

  onAdd(event: any, control: IControl) {
    if (control.onAdd) {
      control.onAdd(event);
    }
  }

  onChipClick(event: any, control: IControl) {
    if (control.onChipClick) {
      control.onChipClick(event);
    }
  }

  onSearch(event: any, control: IControl) {
    if (control.onSearch) {
      control.onSearch(event);
    }
  }

  onLazyLoad(event: any, control: IControl) {
    if (control.onLazyLoad) {
      control.onLazyLoad(event);
    }
  }

  onRate(event: any, control: IControl) {
    if (control.onRate) {
      control.onRate(event);
    }
  }

  onCancel(event: any, control: IControl) {
    if (control.onCancel) {
      control.onCancel(event);
    }
  }

  onRangeSliderChange(event: any, control: IControl) {
    const value = event.target.value;

    if (value) {
      if (control.range) {
        const range = value.split(',');

        if (range.length === 2 && range.every((v: string) => v)) {
          this.form.patchValue({ [control.key]: range });
        } else event.target.value = 'a';
      }

      if (!control.range) {
        this.form.patchValue({ [control.key]: value });
      }
    }
  }

  onSelectAllChange(event: any, control: IControl) {
    if (control.onSelectAllChange) {
      control.onSelectAllChange(event);
    }
  }

  onOptionClick(event: any, control: IControl) {
    if (control.onOptionClick) {
      control.onOptionClick(event);
    }
  }

  onNodeExpand(event: any, control: IControl) {
    if (control.onNodeExpand) {
      control.onNodeExpand(event);
    }
  }

  onNodeCollapse(event: any, control: IControl) {
    if (control.onNodeCollapse) {
      control.onNodeCollapse(event);
    }
  }

  onNodeSelect(event: any, control: IControl) {
    if (control.onNodeSelect) {
      control.onNodeSelect(event);
    }
  }

  onNodeUnselect(event: any, control: IControl) {
    if (control.onNodeUnselect) {
      control.onNodeUnselect(event);
    }
  }

  onShow(event: any, control: IControl) {
    if (control.onShow) {
      control.onShow(event);
    }
  }

  onHide(event: any, control: IControl) {
    if (control.onHide) {
      control.onHide(event);
    }
  }

  private generateRandomString(length = 6): string {
    const number = Math.random();

    if (number != 0) {
      return number.toString(20).substr(2, length);
    } else return this.generateRandomString(length);
  }

  /**
   * Initializes the form by creating a form control for each control in the
   * controls array. The form controls are sorted based on their order property.
   * If a control does not have an id, a random id is generated. The form control
   * is then added to the form with the appropriate validators based on the
   * control's properties.
   */
  private initForm(): void {
    this.controls = this.controls.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      }
      return 0;
    });

    this.controls.forEach((c) => {
      const validator = [];

      // Generate a random id if the control doesn't have one
      if (!c.id) {
        c.id = this.generateRandomString();
      }

      // Add the required validator if the control is required
      if (c.required) {
        validator.push(Validators.required);
      }

      // Add the email validator if the control is an email field
      if (c.email) {
        validator.push(Validators.email);
      }

      // Add the pattern validator if the control has a pattern
      if (c.pattern) {
        validator.push(Validators.pattern(c.pattern));
      }

      // Add the min and max validators if the control is a number field
      if (c.type === 'number') {
        if (c.min) {
          validator.push(Validators.min(c.min));
        }
        if (c.max) {
          validator.push(Validators.max(c.max));
        }
      }

      if (c.valueMatchWith) {
        const validateValueMatch = (
          control: AbstractControl
        ): { [key: string]: any } | null => {
          const valueMatch = this.form.get(c.valueMatchWith!)?.value as string;
          const value = control.value as string;

          switch (c.valueMatchMode) {
            case 'equals':
              if (value !== valueMatch) {
                return {
                  valueMatch: {
                    requiredValue: `giá trị phải ${this.translateValueMatchMode(
                      c.valueMatchMode
                    )} "${c.valueMatchWith
                      ?.replaceAll('_', ' ')
                      .toUpperCase()}"`,
                  },
                };
              }
              break;
            case 'lt':
              if (value >= valueMatch) {
                return {
                  valueMatch: {
                    requiredValue: `giá trị phải ${this.translateValueMatchMode(
                      c.valueMatchMode
                    )} "${c.valueMatchWith
                      ?.replaceAll('_', ' ')
                      .toUpperCase()}"`,
                  },
                };
              }
              break;
            case 'lte':
              if (value > valueMatch) {
                return {
                  valueMatch: {
                    requiredValue: `giá trị phải ${this.translateValueMatchMode(
                      c.valueMatchMode
                    )} "${c.valueMatchWith
                      ?.replaceAll('_', ' ')
                      .toUpperCase()}"`,
                  },
                };
              }
              break;
            case 'gt':
              if (value <= valueMatch) {
                return {
                  valueMatch: {
                    requiredValue: `giá trị phải ${this.translateValueMatchMode(
                      c.valueMatchMode
                    )} "${c.valueMatchWith
                      ?.replaceAll('_', ' ')
                      .toUpperCase()}"`,
                  },
                };
              }
              break;
            case 'gte':
              if (value < valueMatch) {
                return {
                  valueMatch: {
                    requiredValue: `giá trị phải ${this.translateValueMatchMode(
                      c.valueMatchMode
                    )} "${c.valueMatchWith
                      ?.replaceAll('_', ' ')
                      .toUpperCase()}"`,
                  },
                };
              }
              break;
            default:
              return null;
          }

          return null;
        };

        validator.push(validateValueMatch);
      }

      // Add the form control to the form
      this.form.addControl(
        c.key,
        new FormControl(
          { value: c.value, disabled: c.disabled },
          validator,
          c.asyncValidator
        )
      );
    });
  }

  private translateValueMatchMode(valueMatchMode: string): string {
    switch (valueMatchMode) {
      case 'equals':
        return 'bằng';
      case 'gt':
        return 'lớn hơn';
      case 'gte':
        return 'lớn hơn hoặc bằng';
      case 'lt':
        return 'nhỏ hơn';
      case 'lte':
        return 'nhỏ hơn hoặc bằng';
      default:
        return '';
    }
  }
}

type newType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'multiple-checkbox'
  | 'select'
  | 'radio'
  | 'multi-select'
  | 'textarea'
  | 'color'
  | 'editor'
  | 'range'
  | 'chip'
  | 'currency'
  | 'date-picker'
  | 'time-picker'
  | 'switch'
  | 'otp'
  | 'input-mask'
  | 'rating'
  | 'autocomplete'
  | 'slider'
  | 'knob'
  | 'listbox'
  | 'toggle-button'
  | 'cascade-select'
  | 'keyfilter'
  | 'select-button'
  | 'tree-select'
  | 'file-upload';

export interface IControl {
  id?: string;
  key: string;
  type: newType;
  label: string;
  order: number;
  value: any;
  disabled?: boolean;
  placeholder?: string;
  cssClass?: string;
  email?: boolean;
  pattern?: string;
  required?: boolean;
  variant?: 'filled' | 'outlined';
  size?: number;
  readonly?: boolean;
  locale?: string;
  styleClass?: string;
  valueMatchWith?: string;
  valueMatchMode?: 'equals' | 'lt' | 'lte' | 'gt' | 'gte';
  valueMatchFrom?: string;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];

  // types: number, currency
  allowEmpty?: boolean;
  prefix?: string;
  suffix?: string;
  showButtons?: boolean;
  min?: number;
  max?: number;
  buttonLayout?: 'horizontal' | 'vertical' | 'stacked';
  spinnerMode?: 'horizontal' | 'vertical';
  step?: number;
  maxlength?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  useGrouping?: boolean;
  decrementButtonClass?: string;
  incrementButtonClass?: string;
  incrementButtonIcon?: string;
  decrementButtonIcon?: string;

  // types: currency
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name';

  // types: textarea
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  onResize?: (event: any) => void;

  // types: input mask
  slotChar?: string;
  mask?: string;
  showClear?: boolean;
  autocomplete?: string;
  characterPattern?: string;
  onComplete?: (event: any) => void;

  // types: switch, select
  onChange?: (event: any) => void;

  //types: input mask, chips
  onClear?: (event: any) => void;

  // types: calender ( date-picker, time-picker, date-range-picker, date-time-picker, ... )
  inline?: boolean;
  showIcon?: boolean;
  readonlyInput?: boolean;
  baseZIndex?: number;
  touchUI?: boolean;
  appendTo?: string;
  yearRange?: string;
  monthNavigator?: boolean;
  yearNavigator?: boolean;
  showButtonBar?: boolean;
  selectionMode?: 'single' | 'multiple' | 'range';
  view?: 'date' | 'month' | 'year';

  // types: date-picker
  showTime?: boolean;
  dateFormat?: string;

  // types: date-picker has time, time-picker
  hourFormat?: string;
  minuteFormat?: string;
  secondFormat?: string;
  showSeconds?: boolean;

  // types: select, multi-select, cascade-select, autocomplete
  /*
    TreeNode dùng cho type: tree-select
    IOption dùng cho type: select, multi-select, checkbox, ...
    any dùng cho type: select-button

    ex: {
      options: [
        {
          ...
        }
      ] as TreeNode[]
    }
  */
  options?: any | IOption[] | TreeNode[];
  lazy?: boolean;

  // types: select, multi-select, listbox, tree select
  filterValue?: string;
  filter?: boolean;
  filterBy?: string;
  optionLabel?: string;
  optionValue?: string;
  optionGroupLabel?: string;
  optionGroupChildren?: any | string | string[];
  optionDisabled?: string;
  virtualScroll?: boolean;
  vitualScrollItemSize?: number;
  vitualScrollOptions?: ScrollerOptions;
  scrollHeight?: string;
  loading?: boolean;
  group?: boolean;
  filterMatchMode?:
    | 'endsWith'
    | 'startsWith'
    | 'contains'
    | 'equals'
    | 'notEquals'
    | 'in'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte';
  onLazyLoad?: (event: any) => void;
  onFilter?: (event: any) => void;

  // types: slider
  range?: boolean;
  orientation?: 'horizontal' | 'vertical';
  animate?: boolean;
  onSlideEnd?: (event: any) => void;

  // types: rating
  stars?: number;
  cancel?: boolean;
  templateCancel?: TemplateRef<any>;
  templateIconOn?: string;
  templateIconOff?: string;
  onRate?: (event: any) => void;
  onCancel?: (event: any) => void;

  // types: OTP
  integerOnly?: boolean;
  length?: number;
  maskOTP?: boolean;

  // types: multi select
  display?: 'comma' | 'chip';
  selectionLimit?: number;
  maxSelectedLabels?: number;
  selectedItemsLabel?: string;
  onSelectAllChange?: (event: any) => void;

  // types: chips
  field?: string;
  addOnTab?: boolean;
  addOnBlur?: boolean;
  allowDuplicate?: boolean;
  onAdd?: (event: any) => void;
  onRemove?: (event: any) => void;
  onChipClick?: (event: any) => void;
  onBlur?: (event: any) => void;

  // types: cascade select
  style?: any; // ex: {'minWidth': '14rem'}

  // types: autocomplete, listbox
  multiple?: boolean;

  // types: autocomplete
  delay?: number; // default 300
  forceSelection?: boolean;
  unique?: boolean;
  dropdown?: boolean; // enable dropdown mode
  onSearch?: (event: any) => void;

  // types: key filter

  /*
  KeyFilterPattern (
    pint: Positive integers
    int: Integers
    pnum: Positive numbers
    num: Numbers
    hex: Hexadecimal
    email: Email
    alpha: Alphabetic
    alphanum: Alphanumeric
    )
  */
  keyFilter?: RegExp | KeyFilterPattern | null;
  validateOnly?: boolean;

  // types: password
  feedback?: boolean;
  strongRegex?: string;
  mediumRegex?: string;
  toggleMask?: boolean;
  passwordHeaderTemplate?: TemplateRef<any>;
  passwordFooterTemplate?: TemplateRef<any>;

  // types: listbox
  checkbox?: boolean;

  // types: select button
  selectButtonTemplate?: TemplateRef<any>;
  unselectable?: boolean;
  onOptionClick?: (event: any) => void;

  // types: toggle button
  offLabel?: string;
  offIcon?: string;
  onLabel?: string;
  onIcon?: string;
  iconPos?: 'left' | 'right';

  // types: tree select
  containerStyleClass?: string;
  selectionModeTreeSelect?: 'single' | 'multiple' | 'checkbox';
  metaKeySelection?: boolean;
  onNodeExpand?: (event: any) => void;
  onNodeCollapse?: (event: any) => void;
  onNodeSelect?: (event: any) => void;
  onNodeUnselect?: (event: any) => void;
  onShow?: (event: any) => void;
  onHide?: (event: any) => void;

  // types: knob
  valueTemplate?: string;
  strokeWidth?: number;
  textColor?: string;
  valueColor?: string;
  rangeColor?: string;
  showValue?: boolean;

  // types: file upload
  // urlApiFileUpload?: string; // url api fileUpload
  maxFileSize?: number; // MB
  accept?: string;
  // fileLimit?: number;
  // auto?: boolean; // if true, auto upload to server after selection
  // chooseLabel?: string;
  // cancelLabel?: string;
  // uploadLabel?: string;
  // mode?: 'basic' | 'advanced';
  // showUploadButton?: boolean;
  // showCancelButton?: boolean;
  // onUpload?: (event: any) => void;
  // onSelect?: (event: any) => void;
  // onUploadHandler?: (event: any) => void;
  hidden?: boolean;
  onlyImage?: boolean;
  hiddenListFile?: boolean;
}

interface IOption {
  id: string;
  name: string;
  disabled?: boolean;
  items?: IOption[];
}
