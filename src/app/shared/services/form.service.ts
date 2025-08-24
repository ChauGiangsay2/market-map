/* #region  import */
import { Injectable, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn,
  FormArray,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
/* #endregion */
export class FormService {
  constructor() {}

  initForm(listControl: InitFormModel[], data: any) {
    if (data == null) data = {};
    var form = new FormGroup({});

    _.each(listControl, (control) => {
      var value = null;
      if (
        data[control.name!] ||
        (!data[control.name!] && data[control.name!] == 0)
      ) {
        value = data[control.name!];
      }

      var absControl = new FormControl(value);
      var listValidator: ValidatorFn[] = [];

      _.each(control.validators, (validator) => {
        switch (validator) {
          case 'email':
            listValidator.push(Validators.email);
            break;
          case 'required':
            listValidator.push(Validators.required);
            break;
        }
      });

      absControl.setValidators(listValidator);

      this.addControl(form, control.name!, absControl);
    });
    return form;
  }

  addConfigControl(list: InitFormModel[], name: string, validator?: string[]) {
    list.push({
      name: name,
      validators: validator,
    });
  }

  buildLayoutForm(
    list: ModalConfigFormInputModel[],
    key: string,
    name: string,
    type: 'text' | 'number' | 'select' | 'textarea',
    typeUpdateValue?: 'input' | 'change' | 'blur' | undefined,
    placeholder?: string,
    template?: TemplateRef<any>,
    style?: ConfigStyleInputModel,
    listSelect?: any[],
    listError?: KeyValueModel[]
  ) {
    list.push({
      key: key,
      name: name,
      type: type,
      typeUpdateValue: typeUpdateValue,
      placeholder: placeholder,
      template: template,
      style: style,
      listSelect: listSelect,
      listError: listError,
    });
  }

  setupDataForm(form: FormGroup, listControl: InitFormModel[], data: any) {
    _.each(listControl, (item) => {
      this.setValue(form, item.name!, data[item.name!]);
    });
  }

  addControl(form: FormGroup, name: string, control: AbstractControl) {
    form.addControl(name, control);
  }

  setValidators(
    form: FormGroup,
    name: string,
    newValidator: ValidatorFn | ValidatorFn[] | null
  ) {
    form.get(name)?.setValidators(newValidator);
  }

  setValue(form: FormGroup, name: string, value: any) {
    form.get(name)?.setValue(value);
  }

  /* #region  REALOAD VALIDATION CONTROL BY KEY */
  realoadListValidationControl(listForm: FormArray, key: string) {
    _.each(listForm.controls, (item: any) => {
      this.realoadValidationControl(item.get(key) as FormControl);
    });
  }
  realoadValidationControl(control: FormControl) {
    control.updateValueAndValidity();
  }
  /* #endregion */

  removeFormAt(listForm: FormArray, index: number) {
    listForm.removeAt(index);
  }
}

export class InitFormModel {
  name?: string;
  validators?: string[];
}

export class ModalConfigFormInputModel {
  key?: string;
  name?: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  typeUpdateValue?: 'input' | 'change' | 'blur';
  placeholder?: string;
  template?: TemplateRef<any>;
  style?: ConfigStyleInputModel;
  listSelect?: any[]; // id value
  listError?: KeyValueModel[];
}

export class KeyValueModel {
  key?: string;
  value?: string;
}

export class ConfigStyleInputModel {
  stackCss?: string; // sap xep col-1 den 12
  inputCss?: string; // calss css nhu has-error | hass - warning
  type?: 'vertical' | 'vertical_icon'; // input hang doc hoac ngang
  icon?: string; // icon cua input
  alignIcon?: 'left' | 'right'; // vij tri icon
}
