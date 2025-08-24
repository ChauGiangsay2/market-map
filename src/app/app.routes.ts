import { Routes } from '@angular/router';
import { AdminComponent } from './shared/components/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { SetTokenComponent } from './shared/components/set-token/set-token.component';
import { WishListComponent } from './shared/components/wish-list/wish-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: WishListComponent }, // ✅ trang chính
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category/:groupCode/:title', component: CategoryComponent },
  { path: 'account/setToken', component: SetTokenComponent },
  { path: 'admin', component: AdminComponent }
];
