import { Injectable } from '@angular/core';
import _ from 'lodash';
import { SettingDto } from '../service-proxies/qlcv-service-proxies';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { 
    this.createListMonth();
  }

  private readonly listDayOfWeek = [
    {
      id: 1,
      name: 2
    },
    {
      id: 2,
      name: 3
    },
    {
      id: 3,
      name: 4
    },
    {
      id: 4,
      name: 5
    },
    {
      id: 5,
      name: 6
    },
    {
      id: 6,
      name: 7
    },
    {
      id: 0,
      name: 'CN'
    },
  ];
  private readonly listDayInMonth: number[] = [];

  private readonly listSettingReport = [
    {
      id: undefined,
      name: SettingConst.Daily,
      value: [], 
    },
    {
      id: undefined,
      name: SettingConst.DailyEmail,
      value: [], 
    },
    {
      id: undefined,
      name: SettingConst.DefineDateTime,
      value: {"WEEK":2,"MONTH":1,"QUARTER":"01/01","YEAR":"01/01"}
    },
    {
      id: undefined,
      name: SettingConst.Period,
      value: {"WEEK":0,"WEEKTODATE":[],"WEEKMAIL": [],"MONTH":0,"MONTHTODATE":[],"MONTHMAIL": [],"QUARTER":0,"QUARTERTODATE":[],"QUARTERMAIL": [],"YEAR":0,"YEARTODATE":[],"YEARMAIL": [],}
    },
    {
      id: undefined,
      name: SettingConst.DailyPeriod,
      value: {"WEEK":0,"WEEKTODATE":[],"WEEKMAIL": [],"MONTH":0,"MONTHTODATE":[],"MONTHMAIL": [],"QUARTER":0,"QUARTERTODATE":[],"QUARTERMAIL": [],"YEAR":0,"YEARTODATE":[],"YEARMAIL": [],}
    },
  ];

  private readonly settingViewTaskNew =  {
    id: undefined,
    name: SettingConst.ViewTaskNew,
    value: false
  };
  
  private readonly settingApiData =  {
    id: undefined,
    name: SettingConst.ApiData,
    value: []
  };

  private readonly settingViewTaskDashboard =  {
    id: undefined,
    name: SettingConst.ViewTaskDashboard,
    value: {
      autoSave: false,
      listSorting: [
        {
          id: 'title',
          value: 0
        },
        {
          id: 'nguoiXuLyName',
          value: 0
        },
        {
          id: 'hanHoanThanh',
          value: 0
        },
        {
          id: 'categoryName',
          value: 0
        },
        {
          id: 'loaiDinhKyName',
          value: 0
        },
        {
          id: 'quyTrinhCode',
          value: 0
        },
      ],
      search: '',
      level: 0,
      loaiCongViec: {
        id: null,
        name: 'Tất cả',
      },
      loaiDinhKy: {
        id: null,
        name: 'Tất cả',
      },
      quyTrinh: '',
      nguoiXuLy: {
        search: null,
        order:Oder.Department_ASC,
        view: {
          all: true,
          myTask: false
        },
        listUser: []
      }
    }
  };

  private readonly settingSystem = {
    id: undefined,
    name: SettingConst.System,
    value: [
      {
        name: undefined,
        value: undefined
      }
    ]
  }

  private readonly settingEmailNotification = {
    id: undefined,
    name: SettingConst.Notifications,
    value: []
  }

  private readonly settingDataReference = {
    id: undefined,
    name: SettingConst.DataReference,
    value: [
      {
        nameApi: undefined,
        type: undefined,
        action:undefined,
        extendUrl: undefined,
        actionUrl: undefined
      }
    ]
  }


  getListDayOfWeek(){
    return _.cloneDeep(this.listDayOfWeek);
  }

  getListDayInMonth(){
    return _.cloneDeep(this.listDayInMonth);
  }

  getSettingReportDefault(){
    return _.cloneDeep(this.listSettingReport);
  }

  getSettingEmailNotification(){
    return _.cloneDeep(this.settingEmailNotification);
  }

  getSettingByName(name:any, type:any){
    if(type == SettingConst.Report){
      _.find(this.listSettingReport, item => {
        item.name == name
        return item.name ;
      });
    }
  }

  getSettingSystem(){
    return _.cloneDeep(this.settingSystem);
  }

  getSettingViewTaskNew(){
    return _.cloneDeep(this.settingViewTaskNew);
  }
  
  getSettingViewTaskDashboard(){
    return _.cloneDeep(this.settingViewTaskDashboard);
  }

  getSettingApiData(){
    return _.cloneDeep(this.settingApiData);
  }
  
  converValueToJson(obj:any): SettingDto{
    var setting = _.cloneDeep(obj);
    setting.value = JSON.stringify(setting.value);
    return setting as SettingDto;
  }

  private createListMonth(){
    for(var i = 0; i < 32; i++){
      this.listDayInMonth.push(i);
    }
  }
}
enum Oder {
  Department_ASC = 'Department_ASC',
  Department_DESC = 'Department_DESC',
  Staff_ASC = 'Staff_ASC' ,
  Staff_DESC='Staff_DESC'
}
export class SettingConst {
  
  static Report:string = 'Report';
  static Daily:string = 'App.QLCV.BAOCAO.Daily';
  static DefineDateTime:string = 'App.QLCV.BAOCAO.DefineDateTime';
  static Period:string = 'App.QLCV.BAOCAO.Period';
  static DailyPeriod:string = 'App.QLCV.BAOCAO.DailyPeriod';
  static DailyEmail:string = 'App.QLCV.BAOCAO.Daily.Email';

  static Email:string = 'Email';
  static Notifications:string = 'App.QLCV.Email.GetNotifications';

  static ViewTaskNew:string = 'App.QLCV.CVM.Close';
  static ViewTaskDashboard:string = 'App.QLCV.Dashboard';


  static System:string = 'App.QLCV.Systems';

  static DataReference:string = 'App.QLCV.DataReferenceSetting';

  static ApiData:string = 'App.QLCV.Api.Data';

}
