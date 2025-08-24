import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss',
})
export class ErrorMessagesComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl | null;

  readonly errorCode: IErrorCode[] = [
    {
      code: 'required',
      message: 'không bỏ trống',
    },
    {
      code: 'maxlength',
      message: 'không được nhiều hơn',
      keyData: 'requiredLength',
    },
    {
      code: 'minlength',
      message: 'không được ít hơn',
      keyData: 'requiredLength',
    },
    {
      code: 'pattern',
      message: 'không đúng định dạng',
      keyData: 'requiredPattern',
    },
    {
      code: 'min',
      message: 'không được nhỏ hơn',
      keyData: 'min',
    },
    {
      code: 'max',
      message: 'không được nhiều hơn',
      keyData: 'max',
    },
    {
      code: 'email',
      message: 'không đúng định dạng email',
    },
    {
      code: 'valueMatch',
      message: '',
      keyData: 'requiredValue',
    },
  ];
}

interface IErrorCode {
  code: string;
  message: string;
  keyData?: string;
}
