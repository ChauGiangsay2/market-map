import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  isLoggedIn = false;
  userName = '';

  showLoginDialog = false;
  loginUsername = '';
  loginPassword = '';

  listRoute = [
    {
      label: 'Đăng xuất',
      icon: 'pi pi-sign-out',
      command: () => this.onLogout()
    }
  ];

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    this.userName = localStorage.getItem('userName') || '';
  }

  openLoginDialog(): void {
    this.showLoginDialog = true;
  }

  submitLogin(): void {
    if (this.loginUsername && this.loginPassword) {
      this.userName = this.loginUsername;
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', this.userName);
      this.showLoginDialog = false;
      this.loginUsername = '';
      this.loginPassword = '';
    }
  }

  onLogout(): void {
    this.isLoggedIn = false;
    this.userName = '';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }
}
