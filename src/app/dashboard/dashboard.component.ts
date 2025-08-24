import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DashboardContentComponent } from "./partials/dashboard-content/dashboard-content.component";
import { DashboardHeaderComponent } from "./partials/dashboard-header/dashboard-header.component";
import { SettingDto } from '../shared/service-proxies/qlcv-service-proxies';
import { DashboardService, DashboardConst } from '../shared/services/dashboard.service';
import { SupportService } from '../shared/services/support.service';
import { SettingService } from '../shared/services/setting.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    SplitButtonModule,
    DashboardContentComponent,
    DashboardHeaderComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  listGroup:any = [];
  listExclude = ['/app/management/dashboard/task', '/app/management/dashboard/post', '/app/management/dashboard/data', '/app/management/dashboard/transfer'];
  setting:any;
  constructor(
    private readonly _dashboardService:DashboardService,
    private readonly _spService:SupportService,
    private readonly _settingService:SettingService
  ){}
  ngOnInit():void {
    this.setting = this._settingService.getSettingViewTaskDashboard();
  }
}
