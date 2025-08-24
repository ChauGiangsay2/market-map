import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetTokenComponent } from './shared/components/set-token/set-token.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'category/:groupCode/:title',
    component: CategoryComponent,
  },
  {
    path: 'account/setToken',
    component: SetTokenComponent,
  },
];
