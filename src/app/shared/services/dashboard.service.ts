import { Injectable } from '@angular/core';
import { SupportService } from './support.service';
import _ from 'lodash';
import { UtilityService } from './utility.service';
import { CategoryService } from './category.service';
import { DateTimeService } from './date-time.service';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private readonly _spService: SupportService,
    private readonly _ut: UtilityService,
    private readonly _categoryService: CategoryService,
    private readonly _dateTimeService: DateTimeService
  ) {}
  dateime = new Date();
  maxResultCount = 30;
  listLoaiDinhKy = [];
  listData = {
    all: [],
    week: [],
    nextWeek: [],
    nextMonth: [],
  };

  viewDate = {
    type: {
      all: true,
      week: false,
      nextWeek: false,
      nextMonth: false,
    },
    class: {
      default: null,
      active: null,
    },

    callBack: (group: any, key: any) => {
      var notReset = false;
      Object.keys(group.viewDate.type).forEach((item) => {
        if (item == key) {
          if (group.viewDate.type[item]) {
            notReset = true;
          }
          group.viewDate.type[item] = true;
        } else {
          group.viewDate.type[item] = false;
        }
      });
      group._isShow = true;
      group._isHidden = false;

      if (!notReset) {
        // this.resetGroup(group)
      }
    },
  };

  paged = {
    skipCount: this.maxResultCount,
    totalItem: 1,
  };
  listGroup = [
    {
      key: DashboardConst.viecCanLams,
      title: 'A. Việc cần làm',
      type: 'task',
      _isShow: true,
      _isHidden: false,
      _isNhiemVu: false,
      _isLoadNhiemVu: false,
      actionFast: {
        key: 'BAO_CAO',
        _isShow: false,
      },
      viewTask: TaskType.DANG_LAM,
      viewDate: this.viewDate,
      paged: this.paged,
      actionTemplate: null,
      listData: this.listData,
      listDisplay: [],
    },
    {
      key: DashboardConst.viecTreHans,
      title: 'B. Việc trễ hạn',
      type: 'task',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'BAO_CAO',
        _isShow: false,
      },
      viewDate: this.viewDate,
      paged: this.paged,
      actionTemplate: null,
      listData: this.listData,
      listDisplay: [],
    },
    {
      key: DashboardConst.viecMoiThayDoiLienQuans,
      title: 'C. Việc mới - Thay đổi - Liên quan',
      type: 'task',
      _isShow: false,
      _isHidden: true,
      luaChon: luachon.LUA_CHON,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.thongBaoMois,
      title: 'D. Thông báo mới',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.thongBaoChoDuyets,
      title: 'E. Thông báo chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      allowSelectChild: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.viecMoiChoDuyets,
      title: 'F. Việc mới chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'DUYET',
        _isShow: false,
      },
      luaChon: luachon.TAT_CA,
      duyetNhanh: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.viecBaoCaoChoDuyets,
      title: 'G. Việc đã hoàn thành chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'DUYET',
        _isShow: false,
      },
      luaChon: luachon.TAT_CA,
      duyetNhanh: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.viecTamDungKhoiDongChoDuyets,
      title: 'H. Việc tạm dừng - Khời động lại chờ duyệt',
      type: 'TASK',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'DUYET',
        _isShow: false,
      },
      luaChon: luachon.TAT_CA,
      duyetNhanh: true,
      allowSelectChild: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.quyTrinhBanGiaoDuLieuChoDuyets,
      title: 'I. Quy trình - Bàn giao chờ duyệt',
      type: 'transfer-workflow-data',
      _isShow: false,
      _isHidden: true,
      allowSelectChild: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
  ];
  buildGroup(
    listGroup: any,
    actionFastReportTemplate: any,
    actionChangeTemplate?: any,
    actionApproveTemplate?: any
  ) {
    listGroup[0].actionTemplate = actionFastReportTemplate;
    listGroup[1].actionTemplate = actionFastReportTemplate;
    listGroup[2].actionTemplate = actionChangeTemplate;
    listGroup[5].actionTemplate = actionApproveTemplate;
    listGroup[6].actionTemplate = actionApproveTemplate;
    listGroup[7].actionTemplate = actionApproveTemplate;

    listGroup[0].viewDate.class.default =
      'lbl-view-date-viec-can-lam defaultBtn';
    listGroup[1].viewDate.class.default =
      'lbl-view-date-viec-tre-han defaultBtn';
    listGroup[2].viewDate.class.default =
      'lbl-view-date-viec-moi-thay-doi-lien-quan defaultBtn';
    listGroup[3].viewDate.class.default = 'green-jungle defaultBtn';
    listGroup[4].viewDate.class.default =
      'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[5].viewDate.class.default =
      'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[6].viewDate.class.default =
      'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[7].viewDate.class.default =
      'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[8].viewDate.class.default =
      'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';

    listGroup[0].viewDate.class.active = 'strong-blue activebtn';
    listGroup[1].viewDate.class.active = 'btn-danger activebtn';
    listGroup[2].viewDate.class.active = 'btn-light-blue activebtn';
    listGroup[3].viewDate.class.active = 'strong-blue activebtn';
    listGroup[4].viewDate.class.active = 'strong-blue activebtn';
    listGroup[5].viewDate.class.active = 'strong-blue activebtn';
    listGroup[6].viewDate.class.active = 'strong-blue activebtn';
    listGroup[7].viewDate.class.active = 'strong-blue  activebtn';
    listGroup[8].viewDate.class.active = 'strong-blue  activebtn';
  }
  orderGroup = [
    DashboardConst.viecCanLams,
    DashboardConst.viecTreHans,
    DashboardConst.viecMoiThayDoiLienQuans,
    DashboardConst.thongBaoMois,
    DashboardConst.thongBaoChoDuyets,
    DashboardConst.viecMoiChoDuyets,
    DashboardConst.viecBaoCaoChoDuyets,
    DashboardConst.viecTamDungKhoiDongChoDuyets,
    DashboardConst.quyTrinhBanGiaoDuLieuChoDuyets,
  ];
  setupData(listGroup: any, res: any, config: any) {
    _.each(this.orderGroup, (item, index) => {
      _.each(res[item], (itemRes) => {
        itemRes._orderNew = 1;
      });
      var setupDateTime = this._dateTimeService.convertDateToLong(this.dateime);
      if (item == 'viecMoiChoDuyets') {
        var txt = 'viecBaoCaoChoDuyets';
        var data = _.cloneDeep(this.sorting(res[txt], config.listSorting));
        var listData: any[] = [];
        data.forEach((item: any) => {
          if (item.action != 'PAUSETODO' && item.action != 'RESTARTTODO') {
            listData.push(item);
          }
        });
        this.setupItem(listGroup[index], listData);
      } else {
        if (item == 'thongBaoMois') {
          var listData = [];
          res[item] = this.sorting(res[item], config.listSorting);
          var listValue = _.filter(res[item], { bool1: true });
          listData = _.cloneDeep(
            _.filter(res[item], (o) => o.bool1 == false || o.bool1 == null)
          );
          if (listValue.length > 0) {
            listValue.forEach((item) => {
              if (item.hanHoanThanh < setupDateTime!) {
                // this._thongBaoServiceProxy.anThongBao(new GuidEntityDto({
                //   id: item.id
                // }))
              } else {
                listData.push(item);
              }
            });
          }
          this.setupItem(listGroup[index], listData);
        } else if (item == 'viecTamDungKhoiDongChoDuyets') {
          var txt = 'viecBaoCaoChoDuyets';
          var data = _.cloneDeep(this.sorting(res[txt], config.listSorting));
          var listData: any[] = [];
          data.forEach((item: any) => {
            if (item.action == 'PAUSETODO' || item.action == 'RESTARTTODO') {
              listData.push(item);
            }
          });
          this.setupItem(listGroup[index], listData);
        } else {
          res[item] = this.sorting(res[item], config.listSorting);
          this.setupItem(listGroup[index], res[item]);
        }
      }
      this.resetPage(listGroup[index]);
      listGroup[index].listDisplay = this.takeDataDefault(listGroup[index]);
    });
  }
  takeDataDefault(group:any) {

    var listKey = Object.keys(group.viewDate.type).map(m => m);
    var keyData = _.find(listKey, key => {
      return group.viewDate.type[key] == true;
    });

    var listData = _.cloneDeep(group.listData[keyData!]);


    group.paged.totalItem = _.filter(listData, item => {
      return item._orderNew == 1;
    }).length;

    return _.take(listData, this.maxResultCount);
  }
  resetPage(data:any) {
    data.paged.totalItem = 1;
    data.paged.skipCount = this.maxResultCount;
  }
  sorting(list: any, listSorting: any) {
    listSorting = _.cloneDeep(listSorting);
    listSorting = _.orderBy(listSorting, ['value'], ['asc']);
    listSorting = _.filter(listSorting, (item) => {
      return item.value > 0;
    });

    if (listSorting.length > 0) {
      var listProperty = listSorting.map((m: any) => m.id);
      var listDir = listSorting.map((m: any) => 'asc');
      return _.orderBy(list, listProperty, listDir);
    }
    return list;
  }
  setupItem(data: any, listRoot: any) {
    let pivotWeek = this.dateWeek(0, 0);
    let now = new Date();
    let pivotMonth: any;

    var listOnWeek: any = [];
    var listOnNextWeek: any = [];
    var listOnNextMonth: any = [];

    pivotMonth =
      now.getMonth() == 12
        ? new Date(now.getFullYear() + 1, 1, 1)
        : new Date(now.getFullYear(), now.getMonth() + 1, 1);

    if (listRoot.length > 0) {
      listRoot.forEach((item: any) => {
        item.nguoiXuLyName = item.xuLy.fullName;
        if (item.loaiDinhKy) {
          item.loaiDinhKy = this._ut.findPick(
            this.listLoaiDinhKy,
            'id',
            item.loaiDinhKy,
            'name'
          );
        }

        if (
          item.keyData == 'DATA' ||
          item.keyData == 'TASK' ||
          item.keyData == 'POST'
        ) {
          item.url =
            '/app/management/dashboard/' +
            item.keyData.toLowerCase() +
            '/' +
            item.id;
        } else if (item.keyData == 'TRANSFER') {
          item.url = '/app/management/dashboard/transfer/' + item.id;
        } else if (item.keyData == 'WORKFLOW') {
          item.url = '/app/management/workflow/detail/' + item.id;
        } else if (item.keyData == 'NHIEM_VU') {
          item.url = '/app/management/dashboard/task/' + item.id;
        }

        if (
          item.keyData == 'NHIEM_VU' ||
          item.keyData == 'NHIEM_VU_TUONG_LAI'
        ) {
          item._background = 'viec-nhiem-vu';
        } else if (item.keyData == 'TUONG_LAI') {
          item._background = 'viec-tuong-lai';
        } else {
          item._background = 'viec-dang-lam';
        }

        var status = this._ut.findValueOject(
          this._categoryService.listStatusBusiness,
          'id',
          item.status
        );
        if (status) {
          item._statusName = status.name;
          item._color = status.fontColor;
        }

        if (item.hanHoanThanh) {
          if (data.key != 'viecTamDungKhoiDongChoDuyets') {
            item.hanHoanThanh = this._dateTimeService.convertLongToDate(
              item.hanHoanThanh
            );
            let date = item.hanHoanThanh;
            let pivot = new Date(
              pivotWeek.year,
              pivotWeek.month - 1,
              pivotWeek.date
            );

            item._thoiGianHetHan = this.intervalExpired(item.hanHoanThanh);
            item._hanHoanThanh =
              this._dateTimeService.formatDateToDDMM(item.hanHoanThanh) +
              ' ' +
              this._dateTimeService.getWeekDate(item.hanHoanThanh);
            item._treHan =
              this._dateTimeService.compareTwoDay(
                new Date(),
                item.hanHoanThanh
              ) == 1
                ? true
                : false;

            item._treHan =
              this._dateTimeService.compareTwoDay(
                new Date(),
                item.hanHoanThanh
              ) == 1
                ? true
                : false;

            if (
              item._treHan &&
              status &&
              status.id != 'FINISH' &&
              status.id != 'TODO' &&
              !item.value10
            ) {
              item._color = 'font-red';
            }

            if (
              Date.parse(date.toString()) - Date.parse(pivot.toString()) <
              1
            ) {
              item._loaiHanHoanThanh = 'WEEK';
              listOnWeek.push(item);
            }
            if (
              Date.parse(date.toString()) >=
                Date.parse(pivot.toString()) + 86400000 &&
              Date.parse(date.toString()) <= Date.parse(pivotMonth.toString())
            ) {
              item._loaiHanHoanThanh = 'NEXTWEEK';
              listOnNextWeek.push(item);
            }
            if (
              Date.parse(date.toString()) >= Date.parse(pivotMonth.toString())
            ) {
              item._loaiHanHoanThanh = 'NEXTMONTH';
              listOnNextMonth.push(item);
            }
          }
        } else {
        }
      });
    }
    if (data.key == 'viecMoiChoDuyets' || data.key == 'viecBaoCaoChoDuyets') {
      // Lấy công việc mới chờ duyệt
      var viecMoi = _.filter(
        listRoot,
        (o) => o.action == 'CREATETODO' || o.action == 'UPDATETODO'
      );
      var newListOnWeek = _.filter(
        listOnWeek,
        (o) => o.action == 'CREATETODO' || o.action == 'UPDATETODO'
      );
      var newlistOnNextWeek = _.filter(
        listOnNextWeek,
        (o) => o.action == 'CREATETODO' || o.action == 'UPDATETODO'
      );
      var newlistOnNextMonth = _.filter(
        listOnNextMonth,
        (o) => o.action == 'CREATETODO' || o.action == 'UPDATETODO'
      );

      // báo cáo chờ duyệt
      var baocao = _.filter(listRoot, { action: 'REPORTTODO' });
      var reportListOnWeek = _.filter(listOnWeek, { action: 'REPORTTODO' });
      var reportlistOnNextWeek = _.filter(listOnNextWeek, {
        action: 'REPORTTODO',
      });
      var reportlistOnNextMonth = _.filter(listOnNextMonth, {
        action: 'REPORTTODO',
      });

      if (data.key == 'viecMoiChoDuyets') {
        data.listData.all = _.cloneDeep(viecMoi);
        data.listData.week = _.cloneDeep(newListOnWeek);
        data.listData.nextWeek = _.cloneDeep(newlistOnNextWeek);
        data.listData.nextMonth = _.cloneDeep(newlistOnNextMonth);

        data.totalAll = viecMoi.length;
        data.totalWeek = newListOnWeek.length;
        data.totalNextWeek = newlistOnNextWeek.length;
        data.totalNextMonth = newlistOnNextMonth.length;
      } else {
        data.listData.all = _.cloneDeep(baocao);
        data.listData.week = _.cloneDeep(reportListOnWeek);
        data.listData.nextWeek = _.cloneDeep(reportlistOnNextWeek);
        data.listData.nextMonth = _.cloneDeep(reportlistOnNextMonth);

        data.totalAll = baocao.length;
        data.totalWeek = reportListOnWeek.length;
        data.totalNextWeek = reportlistOnNextWeek.length;
        data.totalNextMonth = reportlistOnNextMonth.length;
      }
    } else if (data.key == 'viecTamDungKhoiDongChoDuyets') {
      var tamDungOrKhoiDong = _.filter(
        listRoot,
        (o) => o.action == 'PAUSETODO' || o.action == 'RESTARTTODO'
      );
      var listWeekTD = _.filter(listRoot, (o) => o._loaiHanHoanThanh == 'WEEK');
      var listNextWeekTD = _.filter(
        listRoot,
        (o) => o._loaiHanHoanThanh == 'NEXTWEEK'
      );
      var listNetMonthWeekTD = _.filter(
        listRoot,
        (o) => o._loaiHanHoanThanh == 'NEXTMONTH'
      );

      data.listData.all = _.cloneDeep(tamDungOrKhoiDong);
      data.listData.week = _.cloneDeep(listWeekTD);
      data.listData.nextWeek = _.cloneDeep(listNextWeekTD);
      data.listData.nextMonth = _.cloneDeep(listNetMonthWeekTD);

      data.totalAll = tamDungOrKhoiDong.length;
      data.totalWeek = listWeekTD.length;
      data.totalNextWeek = listNextWeekTD.length;
      data.totalNextMonth = listNetMonthWeekTD.length;
    } else {
      data.listData.all = _.cloneDeep(listRoot);
      data.listData.week = _.cloneDeep(listOnWeek);
      data.listData.nextWeek = _.cloneDeep(listOnNextWeek);
      data.listData.nextMonth = _.cloneDeep(listOnNextMonth);

      data.totalAll = listRoot.length;
      data.totalWeek = listOnWeek.length;
      data.totalNextWeek = listOnNextWeek.length;
      data.totalNextMonth = listOnNextMonth.length;
    }
  }
  dateWeek(d: any, w: any) {
    let now = new Date();
    let day = now.getDay();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    let dateWeek = date + (d - day) + 7 * w;

    if (d == 0) {
      dateWeek += 7;
    }

    let months = [
      {
        data: [1, 3, 5, 7, 8, 10, 12],
        value: 31,
      },
      {
        data: [4, 6, 9, 11],
        value: 30,
      },
    ];

    if (month == 2) {
      date = year % 4 == 0 ? 29 : 28;
    } else {
      months.forEach((m) => {
        if (m.data.find((s) => s == month)) {
          if (dateWeek > m.value) {
            month += 1;
            // month = month > 12 ? (month - 12) : month;
            if (month > 12) {
              month = month - 12;
              year += 1;
            }
            dateWeek = dateWeek - m.value;
          }
        }
      });
    }

    let result = {
      date: dateWeek,
      month: month,
      year: year,
    };

    return result;
  }
  intervalExpired(hanHoanThanh: any) {
    let rs = this.caclDayExpired(hanHoanThanh);
    let ago = rs < 0 ? false : true;
    let day = '';
    let week = '';
    let month = '';
    let year = '';
    let stringShow = '';
    if (Math.abs(rs) > 0 && Math.abs(rs) < 7) {
      day = Math.abs(rs) + ' ngày';
      stringShow = day;
    }
    if (Math.abs(rs) >= 7 && Math.abs(rs) < 30) {
      week = Math.round(Math.abs(rs) / 7) + ' tuần';
      stringShow = week;
    }
    if (Math.abs(rs) >= 30 && Math.abs(rs) < 365) {
      month = Math.round(Math.abs(rs) / 30) + ' tháng';
      stringShow = month;
    }
    if (Math.abs(rs) >= 365) {
      year = Math.round(Math.abs(rs) / 365) + ' năm';
      stringShow = year;
    }
    if (rs == 0) {
      stringShow += 'Hôm nay';
    } else {
      stringShow += ago ? ' trước' : ' tới';
    }
    return stringShow;
  }
  caclDayExpired(hanHoanThanh: any) {
    let date = hanHoanThanh;
    let now = new Date();
    (now as any) = this._dateTimeService.formatTimeDefault(now);
    let ago =
      (Date.parse(now.toString()) - Date.parse(date.toString())) / 86400000;
    return Math.round(ago);
  }
}
enum TaskType {
  DANG_LAM = 'DANG_LAM',
  TUONG_LAI = 'TUONG_LAI',
  TAT_CA = 'TAT_CA',
}
enum luachon {
  TAT_CA = 'TAT_CA',
  NHAN_VIEN = 'NHAN_VIEN',
  LUA_CHON = 'Lua_Chon',
  READ_ALL = 'Read_All',
  READ_CREATE = 'Read_Create',
}
export class DashboardConst {
  static viecCanLams = 'viecCanLams';
  static viecTreHans = 'viecTreHans';
  static viecMoiThayDoiLienQuans = 'viecMoiThayDoiLienQuans';
  static thongBaoMois = 'thongBaoMois';
  static viecMoiChoDuyets = 'viecMoiChoDuyets';
  static viecBaoCaoChoDuyets = 'viecBaoCaoChoDuyets';
  static viecTamDungKhoiDongChoDuyets = 'viecTamDungKhoiDongChoDuyets';
  static thongBaoChoDuyets = 'thongBaoChoDuyets';
  static quyTrinhBanGiaoDuLieuChoDuyets = 'quyTrinhBanGiaoDuLieuChoDuyets';
  static viecDuLieuHoatDongs = 'viecDuLieuHoatDongs';
}
