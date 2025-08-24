import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-menu-horizontal',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './menu-horizontal.component.html',
  styleUrl: './menu-horizontal.component.scss',
})
export class MenuHorizontalComponent {
  menus: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
    },

  ];

}
