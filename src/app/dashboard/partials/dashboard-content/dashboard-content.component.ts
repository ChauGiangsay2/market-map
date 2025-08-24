import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardConst, DashboardService } from '../../../shared/services/dashboard.service';
import { SettingService } from '../../../shared/services/setting.service';
import { SupportService } from '../../../shared/services/support.service';
import { SettingDto } from '../../../shared/service-proxies/qlcv-service-proxies';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent implements OnInit {

  constructor(
    private readonly _dashboardService:DashboardService,
    private readonly _spService:SupportService,
    private readonly _settingService:SettingService
  ){
    this.setting = this._settingService.getSettingViewTaskDashboard();
    this.listGroup = this._dashboardService.listGroup;
  }
  setting:any;
  listGroup:any = [];
  actionFastReportTemplate:string = "Report";
  actionChangeTemplate:string = "Change";
  actionApproveTemplate:string = "Approve";

  ngOnInit(): void {
    this._dashboardService.buildGroup(this.listGroup, this.actionFastReportTemplate,this.actionChangeTemplate,this.actionApproveTemplate)  ; 
    this.setupDataDashboard();
  }

  setupDataDashboard(data?:any) {
    let index = this.listGroup.findIndex((f:any) => f.key == DashboardConst.viecCanLams);
    this.listGroup[index]._isNhiemVu = false;
    this.listGroup[index]._isLoadNhiemVu = false;
    if (this.setting.value.autoSave) {
      var input =  this._spService.cloneDeep(this.setting);
      input.value = JSON.stringify(this.setting.value);
      input = SettingDto.fromJS(input);
      // this._settingServce.update(input).subscribe(res => {
      //   console.log('LUU CAU HINH THANH CONG');
      // })
    }
    // $('#dashboard').scrollTop(0);
    // $('#dashboard-table').scrollTop(0);
    var test = this._spService.getDataTest()
    this._dashboardService.setupData(this.listGroup,test,this.setting.value)
    console.log(this.listGroup)
     
  }
}

