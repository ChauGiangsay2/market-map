import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { TopComponent } from './shared/components/top/top.component';
import { MenuHorizontalComponent } from './layout/menu-horizontal/menu-horizontal.component';
import { ToastModule } from 'primeng/toast';
import { WishListComponent } from "./shared/components/wish-list/wish-list.component";
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopComponent,
    MenuHorizontalComponent,
    ToastModule,
    WishListComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bs-dynamic-form';
  isAdminPage = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    // theo dõi route để xác định có phải /admin không
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isAdminPage = e.urlAfterRedirects.startsWith('/admin');
      });
  }
}
