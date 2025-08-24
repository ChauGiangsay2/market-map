import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tileLayer, latLng, Map, Marker, marker, icon, LatLngTuple } from 'leaflet';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarketStallListComponent } from '../market-stall-list/market-stall-list.component';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeafletModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    MarketStallListComponent
  ],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {
  map!: Map;
  dialogVisible = false;
  dialogReviewVisible = false;  // dialog đánh giá

  form!: FormGroup;
  clickedLat!: number;
  clickedLng!: number;
  clickedAddress = signal('');
  markers: Marker[] = [];

  baChieuCoords: LatLngTuple = [10.805065, 106.692247];
  baChieuDialogVisible = false;

  vendors = [
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

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng(10.77653, 106.70098)
  };

constructor(
  private fb: FormBuilder,
  private zone: NgZone,
  private router: Router   // ✅ thêm private
) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      images: [null]
    });
  }

  onMapReady(map: Map) {
    this.map = map;

    setTimeout(() => {
      map.invalidateSize();
      map.panTo(this.baChieuCoords);
    }, 100);

    marker(this.baChieuCoords, {
      icon: icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })
    })
      .addTo(this.map)
      //.bindTooltip('📍 Chợ Bà Chiểu', { permanent: true, direction: 'top' })
      .on('click', () => {
        this.zone.run(() => {
          this.baChieuDialogVisible = true;
        });
      });

  }

  onMapClick(evt: any) {
    this.clickedLat = evt.latlng.lat;
    this.clickedLng = evt.latlng.lng;
    this.clickedAddress.set(
      `Lat: ${this.clickedLat.toFixed(6)}, Lng: ${this.clickedLng.toFixed(6)}`
    );
    this.dialogVisible = true;
  }

  onSelectFiles(event: any) {
    this.form.patchValue({ images: event.files });
  }

  save() {
    if (this.form.invalid) return;

    const payload = new FormData();
    payload.append('name', this.form.value.name);
    payload.append('description', this.form.value.description);
    payload.append('latitude', String(this.clickedLat));
    payload.append('longitude', String(this.clickedLng));
    payload.append('address', this.clickedAddress());

    (this.form.value.images as File[] || []).forEach(file =>
      payload.append('images', file, file.name)
    );

    marker([this.clickedLat, this.clickedLng], {
      icon: icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })
    })
      .bindPopup(`<b>${this.form.value.name}</b><br>${this.clickedAddress()}`)
      .addTo(this.map);

    this.dialogVisible = false;
    this.form.reset();
  }
  onAddVendor() {
  console.log('👉 Thêm sạp mới');
  // Gợi ý: mở một dialog để thêm mới
}

onEditVendor(vendor: any) {
  console.log('✏️ Sửa sạp:', vendor);
  // Gợi ý: mở form dialog để chỉnh sửa
}

onDeleteVendor(vendor: any) {
  console.log('🗑️ Xoá sạp:', vendor);
  this.vendors = this.vendors.filter(v => v !== vendor);
}

goToAdmin() {
  window.open('/admin', '_blank');
}


}
