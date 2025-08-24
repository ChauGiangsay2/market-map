import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    RatingModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  stalls: any[] = [];
  selectedStall: any = null;

  dialogVisible = false;
  form!: FormGroup;
  isEdit = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.seedData();

    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      openHours: ['', Validators.required],
      contact: ['', Validators.required],
      items: ['', Validators.required],
      images: [''],
      rating: [0]
    });
  }

  seedData() {
    this.stalls = [
      {
        name: 'Sạp Trái Cây Cô Năm',
        address: 'Lô A1, Chợ Bà Chiểu',
        openHours: '6h - 18h',
        contact: '0901 111 222',
        items: 'Xoài, Ổi, Cam',
        images: ['assets/fruits.jpg'],
        rating: 4.5
      },
      {
        name: 'Sạp Cá Chú Bảy',
        address: 'Lô C2, Chợ Bà Chiểu',
        openHours: '5h - 14h',
        contact: '0902 333 444',
        items: 'Cá lóc, cá rô',
        images: ['assets/fish.jpg'],
        rating: 4.3
      },
      {
        name: 'Sạp Quần Áo Cô Trang',
        address: 'Lô B3, Chợ Bà Chiểu',
        openHours: '8h - 20h',
        contact: '0903 555 666',
        items: 'Áo thun, quần jeans',
        images: ['assets/clothes.jpg'],
        rating: 4.8
      },
      {
        name: 'Sạp Gạo Chú Ba',
        address: 'Lô A5, Chợ Bà Chiểu',
        openHours: '7h - 17h',
        contact: '0904 777 888',
        items: 'Gạo ST25, gạo Nàng Thơm',
        images: ['assets/rice.jpg'],
        rating: 4.6
      },
      {
        name: 'Sạp Gia Vị Cô Sáu',
        address: 'Lô D1, Chợ Bà Chiểu',
        openHours: '6h - 19h',
        contact: '0905 999 000',
        items: 'Muối, nước mắm, tiêu',
        images: ['assets/spices.jpg'],
        rating: 4.4
      }
    ];
  }

  openNew() {
    this.form.reset({ rating: 0 });
    this.isEdit = false;
    this.dialogVisible = true;
  }

  editStall(stall: any) {
    this.isEdit = true;
    this.selectedStall = stall;
    this.form.patchValue(stall);
    this.dialogVisible = true;
  }

  deleteStall(stall: any) {
    this.stalls = this.stalls.filter(s => s !== stall);
  }

  save() {
    if (this.form.invalid) return;

    if (this.isEdit && this.selectedStall) {
      Object.assign(this.selectedStall, this.form.value);
    } else {
      this.stalls.push({
        ...this.form.value,
        images: this.form.value.images ? [this.form.value.images] : []
      });
    }

    this.dialogVisible = false;
    this.form.reset();
  }
  showPending() {
  alert('Hiện có 3 sạp đang chờ duyệt!');
}

}
