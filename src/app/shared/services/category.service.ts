import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly _ut: UtilityService) {

  }

  readonly listDayOfWeek = [
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

  readonly listDuLieuDoiTuongLienQuan = [
    {
      id: 'THAMKHAO',
      name: 'Nhập dữ liệu'
    },
    {
      id: 'THAMGIATHUCHIEN',
      name: 'Quản lý dữ liệu'
    },
  ]

  readonly listCongViecDoiTuongLienQuan = [
    {
      id: 'THAMKHAO',
      name: 'Tham khảo'
    },
    {
      id: 'THAMGIATHUCHIEN',
      name: 'Tham gia thực hiện'
    }, 
  ];

  /* #region  QUY TRINH */
  readonly listKieuTao = [
    {
      id: 'TRUOC',
      name: 'Tạo trước'
    },
    {
      id: 'HANBATDAU',
      name: 'Tạo sau'
    },
  ]
  readonly listLoaiThoiHan = [
    {
      id: 'HANHOANTHANH',
      name: 'Hạn hoàn thành'
    },
    {
      id: 'HANBATDAU',
      name: 'Hạn bắt đầu'
    },
  ];
  /* #endregion END QUY TRINH*/

  readonly listOrderDasboard = [0, 1, 2, 3, 4, 5, 6];

  readonly listDefineLoaiDuLieu = [
    {
      id: 'text',
      name: 'Nhập nội dung',
    },
    {
      id: 'numeric',
      name: 'Nhập số',
    },
    {
      id: 'date',
      name: 'Nhập ngày',
    },
    {
      id: 'select',
      name: 'Lựa chọn',
    },
    // {
    //   id: 'mutipleSelect',
    //   name: 'Lựa chọn nhiều',
    // },
    {
      id: 'checkbox',
      name: 'Đánh dấu',
    }
  ];

  readonly listLoaiDinhKy = [
    {
      id: null,
      name: 'Tất cả',
    },
    {
      id: 'TUAN',
      name: 'Tuần',
    },
    {
      id: 'THANG',
      name: 'Tháng',
    },
    {
      id: 'QUY',
      name: 'Quý',
    },
    {
      id: 'NAM',
      name: 'Năm',
    }
  ];
  readonly listCategory = [
    {
      id: 'ACTIVE',
      name: 'Cho phép'
    },
    {
      id: 'BLOCK',
      name: 'Khóa'
    }
  ];

  readonly listStatusBusiness = [
    {
      id: null,
      name: 'Tất cả',
      module: ['TASK', 'SEARCH_TASK', 'SEARCH_POST', 'SEARCH_DATA', 'SEARCH_WORKFLOW', 'POST', 'DATA', 'WORKFLOW', 'SEARCH_TRANSFER']
    },
    {
      id: 'APPROVE',
      name: 'Đã duyệt',
      fontColor: 'font-green-matcha',
      bgColor: 'bg-green-jungle',
      module: ['TASK', 'POST', 'DATA', 'WORKFLOW', 'SEARCH_TASK', 'SEARCH_POST', 'SEARCH_DATA', 'SEARCH_WORKFLOW', 'SEARCH_TRANSFER']
    },
    {
      id: 'TODO',
      name: 'Chờ duyệt',
      class: 'yellow-lemon',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: ['TASK', 'POST', 'DATA', 'WORKFLOW', 'SEARCH_TASK', 'SEARCH_POST', 'SEARCH_DATA', 'SEARCH_WORKFLOW', 'SEARCH_TRANSFER']
    },
    {
      id: 'DENY',
      name: 'Từ chối',
      fontColor: 'font-red',
      bgColor: 'bg-red',
      module: ['TASK', 'POST', 'DATA', 'WORKFLOW', 'SEARCH_WORKFLOW', 'SEARCH_TRANSFER']
    },
    
    {
      id: 'REPORT',
      name: 'Báo cáo',
      fontColor: 'font-green',
      bgColor: 'bg-green',
      module: []
    },
    {
      id: 'APPROVEREPORT',
      name: 'Duyệt báo cáo',
      fontColor: 'font-green',
      bgColor: 'bg-green',
      module: []
    },
    {
      id: 'REPORTTODO',
      name: 'Báo cáo chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: ['TASK']
    },
    {
      id: 'UPDATECREATETODO',
      name: 'Cập nhật tạo mới chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: ['']
    },
    {
      id: 'DENYREPORT',
      name: 'Từ chối báo cáo',
      fontColor: 'font-red',
      bgColor: 'bg-red',
      module: []
    },
    {
      id: 'CANCELREPORT',
      name: 'Hủy báo cáo',
      fontColor: 'font-blue-hoki',
      bgColor: 'bg-blue-hoki',
      module: []
    },
    {
      id: 'PAUSE',
      name: 'Tạm dừng',
      fontColor: 'font-yellow-casablanca',
      bgColor: 'bg-yellow-casablanca',
      module: ['TASK', 'DATA', 'SEARCH_TASK', 'SEARCH_DATA']
    },
    {
      id: 'APPROVEPAUSE',
      name: 'Duyệt tạm dừng',
      fontColor: 'font-yellow-casablanca',
      bgColor: 'bg-yellow-casablanca',
      module: []
    },
    {
      id: 'PAUSETODO',
      name: 'Tạm dừng chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: []
    },
    {
      id: 'DENYPAUSE',
      name: 'Từ chối tạm dừng',
      fontColor: 'font-red',
      bgColor: 'bg-red',
      module: []
    },
    {
      id: 'CANCELPAUSE',
      name: 'Hủy Tạm dừng',
      fontColor: 'font-blue-hoki',
      bgColor: 'bg-blue-hoki',
      module: []
    },

    {
      id: 'RESTART',
      name: 'Khởi động lại',
      fontColor: 'font-yellow-casablanca',
      bgColor: 'bg-yellow-casablanca',
      module: []
    },
    {
      id: 'APPROVERESTART',
      name: 'Duyệt khởi động lại',
      fontColor: 'font-yellow-casablanca',
      bgColor: 'bg-yellow-casablanca',
      module: []
    },
    {
      id: 'RESTARTTODO',
      name: 'Khời động chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: []
    },
    {
      id: 'FINISHTODO',
      name: 'Kết thúc chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: []
    },
    {
      id: 'DENYRESTART',
      name: 'Từ chối khởi động lại',
      fontColor: 'font-red',
      bgColor: 'bg-red',
      module: []
    },
    {
      id: 'CANCELRESTART',
      name: 'Hủy khởi động lại',
      fontColor: 'font-blue-hoki',
      bgColor: 'bg-blue-hoki',
      module: []
    },
    {
      id: 'FINISH',
      name: 'Kết thúc',
      fontColor: 'font-green',
      bgColor: 'bg-green',
      module: ['TASK', 'SEARCH_TASK', 'SEARCH_POST',]
    },
    {
      id: 'CANCEL',
      name: 'Hủy bỏ',
      fontColor: 'font-dark',
      bgColor: 'bg-dark',
      module: ['TASK']
    },
    {
      id: 'CREATE',
      name: 'Tạo mới',
      fontColor: 'font-green-jungle',
      bgColor: 'bg-green-jungle',
      module: []
    },
    {
      id: 'CREATETODO',
      name: 'Tạo mới chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: []
    },
    {
      id: 'UPDATE',
      name: 'Cập nhật',
      fontColor: 'font-blue',
      bgColor: 'bg-blue',
      module: []
    },
    {
      id: 'UPDATETODO',
      name: 'Cập nhật chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: []
    },
    {
      id: 'REPORTODO',
      name: 'Báo cáo chờ duyệt',
      fontColor: 'font-yellow-lemon',
      bgColor: 'bg-yellow-lemon',
      module: []
    },
    {
      id: 'UPDATECREATE',
      name: 'Cập nhật tạo mới',
      fontColor: 'font-green-jungle',
      bgColor: 'bg-green-jungle',
      module: []
    },
    {
      id: 'APPROVECREATE',
      name: 'Phê duyệt tạo mới',
      fontColor: 'font-green-jungle',
      bgColor: 'bg-green-jungle',
      module: []
    },
    {
      id: 'APPROVEUPDATE',
      name: 'Phê duyệt thay đổi',
      fontColor: 'font-green-jungle',
      bgColor: 'bg-green-jungle',
      module: []
    },
    {
      id: 'CANCELREPORT',
      name: 'Hủy báo cáo',
      fontColor: 'font-dark',
      bgColor: 'bg-dark',
      module: []
    },
    {
      id: 'CANCELUPDATE',
      name: 'Hủy cập nhật',
      fontColor: 'font-dark',
      bgColor: 'bg-dark',
      module: []
    },

    {
      id: 'DENYUPDATE',
      name: 'Từ chối cập nhật',
      fontColor: 'font-danger',
      bgColor: 'bg-red',
      module: []
    },

  ];

  readonly listDoBaoMat = [
    {
      id: 1,
      name: 'Thấp'
    },
    {
      id: 2,
      name: 'Trung bình'
    },
    {
      id: 3,
      name: 'Cao'
    }
  ];

  readonly listDoUuTien = [
    {
      id: 1,
      name: 'Thấp'
    },
    {
      id: 2,
      name: 'Trung bình'
    },
    {
      id: 3,
      name: 'Cao'
    }
  ];

  getListStatusBusinessByKeyModule(key:any) {
    return this.listStatusBusiness.filter(f => f.module.find(f2 => f2 == key) != null);
  }

}
