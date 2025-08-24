import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-market-stall-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
    RatingModule,
    InputTextareaModule
  ],
  templateUrl: './market-stall-list.component.html',
  styleUrls: ['./market-stall-list.component.scss']
})
export class MarketStallListComponent {
  // ✅ Cho phép cha bind stalls vào
  @Input() stalls: any[] = [];
dialogAddVisible = false;     // dialog thêm mới
dialogReviewVisible = false;  // dialog đánh giá
dialogPendingVisible = false;   // Dialog chờ duyệt
lastAddedStall: any;

  form!: FormGroup;
  reviewForm!: FormGroup;
  selectedStall: any;
  userName = localStorage.getItem('userName') || 'Khách';
  shareDialogVisible = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      openHours: ['', Validators.required],
      contact: ['', Validators.required],
      items: ['', Validators.required]
    });

    // Nếu muốn preload dữ liệu chỉ khi không truyền từ cha
    if (!this.stalls || this.stalls.length === 0) {
      this.seedData();
    }

    this.reviewForm = this.fb.group({
      rating: [0, Validators.required],
      comment: ['']
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

save() {
  if (this.form.invalid) return;

  const data = {
    ...this.form.value,
    images: [this.form.value.images || 'assets/placeholder.jpg'],
    rating: 0,
    status: 'Đang chờ duyệt'
  };

  this.stalls.push(data);

  // Lưu lại để hiển thị trong dialog chờ duyệt
  this.lastAddedStall = data;

  // Đóng dialog thêm mới, mở dialog chờ duyệt
  this.dialogAddVisible = false;
  this.dialogPendingVisible = true;

  this.form.reset();
}

 onShare(stall: any) {
    this.selectedStall = stall;
    this.shareDialogVisible = true;
  }

  getShareLinks(stall: any) {
    const link = encodeURIComponent('https://example.com/stall/' + stall.name.replace(/\s+/g, '-'));
    const text = encodeURIComponent(`Xem ngay ${stall.name} tại chợ Bà Chiểu!`);

    return {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      twitter: `https://twitter.com/intent/tweet?url=${link}&text=${text}`,
      zalo: `https://zalo.me/share/url?url=${link}&title=${text}`
    };
  }

  onSaveAll() {
    alert('Lưu tất cả sạp');
  }

  onShareAll() {
    alert('Chia sẻ tất cả');
  }



  submitReview() {
    if (this.reviewForm.invalid) return;

    const review = {
      user: localStorage.getItem('userName') || 'Khách',
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment
    };

    console.log('💬 Review:', review, 'cho stall:', this.selectedStall);
    this.dialogReviewVisible = false;
    this.reviewForm.reset({ rating: 0, comment: '' });
  }
onSelectFiles(event: any) {
  console.log('📷 Files selected:', event.files);
}

openDialog() {
  this.dialogAddVisible = true;
}

onRate(stall: any) {
  this.selectedStall = stall;
  this.dialogReviewVisible = true;
}

}
