import { Component, OnInit } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicFormComponent, IControl } from '../../dynamic-form/dynamic-form.component';
import { FormGroup } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogFooterDirective } from '../../shared/directives/dialog-footer.directive';


@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    DynamicFormComponent,
    DialogFooterDirective,
    ToastModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  constructor(
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  form = new FormGroup({});
  controls: IControl[] = [];
  isNew: boolean = true;
  controlsValue: any = null;


  ngOnInit(): void {
    this.isNew = this.config.data.value ? false : true;
    this.setListControls();
    if (this.config.data.value) {
      this.controlsValue = this.config.data.value
    }
  }

  setListControls() {
    this.controls = [
      {
        key: '',
        type: 'select',
        label: 'Danh mục cha',
        order: 1,
        value: '',
        options: [],
        cssClass: 'col-12 col-md-9',
        placeholder: '',
        required: true,
      },
      {
        key: 'status',
        type: 'select',
        label: 'Trạng thái',
        order: 1,
        value: '',
        options: [
          { id: 'r_1', name: 'Cho phép' },
          { id: 'r_2', name: 'Khoá' },
        ],
        cssClass: 'col-12 col-md-3',
        placeholder: '',
        required: true,
      },
      {
        key: 'code',
        type: 'text',
        label: 'Mã danh mục',
        order: 1,
        value: '',
        cssClass: 'col-12 col-md-3',
        placeholder: '',
        required: true,
      },
      {
        key: 'name',
        type: 'text',
        label: 'Tên danh mục',
        order: 1,
        value: '',
        cssClass: 'col-12 col-md-6',
        placeholder: '',
        required: true,
      },
      {
        key: 'viTri',
        type: 'number',
        label: 'Vị trí',
        order: 1,
        value: undefined,
        max: 100,
        min: 0,
        cssClass: 'col-12 col-md-3 ',
        placeholder: '',
        required: true,
      },
      {
        key: 'moTa',
        type: 'text',
        label: 'Mô tả',
        order: 1,
        value: '',
        cssClass: 'col-12',
        placeholder: 'Nhập mô tả',
        required: true,
      },
    ]
  }
  onSave() { }
}
