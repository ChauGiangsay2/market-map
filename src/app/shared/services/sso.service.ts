import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';
import {
  IInfoDetailUserDto,
  InfoDetailUserDto,
} from '../service-proxies/qlcv-service-proxies';

@Injectable({
  providedIn: 'root',
})
export class SSOUtilitService {
  constructor() {}

  getListOrgAndEmployeeOfUserId(listOrg: any[], userId: number) {
    listOrg = _.cloneDeep(listOrg);
    var result = [];
    for (var i = 0; i < listOrg.length; i++) {
      var org = listOrg[i];
      var user = org.listUser.find(
        (item: any) => item.key == userId.toString()
      );

      if (!user) {
        continue;
      }

      if (user.code == '_0002EMPLOYEE') {
        org.listUser = [user];
      } else if (user.code == '_0003MANAGER') {
        _.remove(org.listUser, (item: any) => {
          return item.code == '_0003MANAGER' && item.key != userId.toString();
        });
      }

      result.push(org);
    }
    return result;
  }

  /* #region  lấy mạc định thông tin  user, bộ phận đầu theo userId */
  setInfoDefaulUserOfOrg(listOrg: any[], userId: number) {
    for (var i = 0; i < listOrg.length; i++) {
      var orgDto = listOrg[i];

      for (var j = 0; j < orgDto.listUser.length; j++) {
        var userDto = orgDto.listUser[j];

        if (userDto.key == userId) {
          var data: InfoDetailUserDto = new InfoDetailUserDto();
          data.userId = parseInt(userDto.key);
          data.fullName = userDto.info;
          data.emailAddress = userDto.emailAddress;
          data.orgId = orgDto.organizationId;
          data.orgName = orgDto.name;
          return data;
        }
      }
    }
    return null;
  }

  getUserOfOrgByOrgId(listOrg: any[], userId: number, orgId: string) {
    var orgDto = _.find(listOrg, ['organizationId', orgId]);

    if (orgDto) {
      var userDto = _.find(orgDto.listUser, (user) => {
        return user.key == userId;
      });

      var data: UserSelectorDto = {
        userId: userDto ? parseInt(userDto.key) : undefined,
        fullName: userDto ? userDto.info : 'Nhân viên đã rời đi',
        emailAddress: userDto ? userDto.emailAddress : '',
        organizationId: orgDto ? orgDto.organizationId : null,
        organizationName: orgDto ? orgDto.name : 'Phòng ban không tồn tại',
        code: orgDto ? orgDto.code : null,
      };
      return data;
    }
    return null;
  }

  /* #endregion */

  /* #region  cap nhat danh sach bo phan va list user trong bo phan khi chon nguoi xu ly */
  getListNguoiBoPhanDuyet(listOrg: any[], boPhanId: string, userId: number) {
    var result: any = [];

    var org = listOrg.find((item) => item.organizationId == boPhanId);

    if (!org) return result;

    var code = org.code;

    var listCodeOrg = code ? code.split('.') : [];

    var strCode = '';

    // tim tat ca cac user theo code
    _.each(listCodeOrg, (code) => {
      strCode += strCode == '' ? code : '.' + code;

      var orgDto = _.find(listOrg, ['code', strCode]);

      if (orgDto) {
        // xoa cac user khong co quyen duyet va khac userID
        _.remove(orgDto.listUser, (user: any) => {
          return user.code != '_0003MANAGER' && user.key != userId;
        });

        result.push(orgDto);
      }
    });
    return result;
  }

  /* #endregion */

  /* #region  kiem tra user co quan ly bo phan nay k */
  checkPermissionManager(listOrg: any[], orgId: string, userId: number) {
    var organizationManagment: any = listOrg.find(
      (item) => item.organizationId == orgId
    );

    // nếu org của management khoong cos trong danh sach org duyet
    if (!organizationManagment) return false;

    // kiem tra user management nay co quan ly bo phan nay k
    var userManagement = _.find(organizationManagment.listUser, (item) => {
      return item.key == userId && item.code == '_0003MANAGER';
    });

    return userManagement != null;
  }
  /* #endregion */

  /* #region  cap nhat danh sach bo phan va list user trong bo phan khi chon nguoi xu ly */
  getInfoNguoiBoPhanDuyetDefault(
    listOrg: any[],
    boPhanId: string,
    userId: number
  ) {
    var listOrgDuyet = _.cloneDeep(
      this.getListNguoiBoPhanDuyet(listOrg, boPhanId, userId)
    );

    for (var i = listOrgDuyet.length - 1; i >= 0; i--) {
      var orgDto = listOrgDuyet[i];

      var userDto = _.find(orgDto.listUser, ['code', '_0003MANAGER']);

      if (userDto) {
        var data: InfoDetailUserDto = new InfoDetailUserDto();
        data.userId = parseInt(userDto.key);
        data.fullName = userDto.info;
        data.emailAddress = userDto.emailAddress;
        data.orgId = orgDto.organizationId;
        data.orgName = orgDto.name;
        return data;
      }
    }
    return this.setInfoDefaulUserOfOrg(listOrg, userId);
  }

  /* #region  DANH SACH ORG USER DO CO  */
  getListOrganizationForUser(listOrg: any[], userId: number) {
    var result: InfoDetailUserDto[] = [];
    _.each(listOrg, (org) => {
      var user = org.listUser.find((item: any) => item.key == userId);
      if (user) {
        result.push(
          new InfoDetailUserDto({
            userId: parseInt(user.key),
            fullName: user.info,
            emailAddress: user.emailAddress,
            orgId: org.organizationId,
            orgName: org.name,
          } as IInfoDetailUserDto)
        );
      }
    });
    return result;
  }

  getAllListOrganizationForUser(listOrg: any[]) {
    var result: InfoDetailUserDto[] = [];
    _.each(listOrg, (org) => {
      result = result.concat(
        org.listUser.map((m: any) => {
          return new InfoDetailUserDto({
            userId: parseInt(m.key),
            fullName: m.info,
            emailAddress: m.emailAddress,
            orgId: org.organizationId,
            orgName: org.name,
          } as IInfoDetailUserDto);
        })
      );
    });
    return result;
  }

  /* #endregion */
  getUserInfoByOrgIdAndUserId(
    listOrg: any[],
    boPhanId: string,
    userId: number
  ): InfoDetailUserDto {
    var result = new InfoDetailUserDto();
    result.orgId = boPhanId;
    result.userId = userId;
    result.fullName = 'Nhân viên đã rời đi';
    result.orgName = 'Phòng ban không tồn tại';

    var organization = listOrg.find((item) => item.organizationId == boPhanId);
    if (organization) {
      result.orgName = organization.name;
      var user = organization.listUser.find(
        (item: any) => item.key == userId.toString()
      );
      if (user) {
        result.fullName = user.info;
        result.emailAddress = user.emailAddress;
      }
    }
    return result;
  }

  setNguoiBoPhanDuyet(form: FormGroup, listOrganization: any[], key?: string) {
    if (!key) key = 'xuLy';

    if (form) {
      var orgId = form.get(key)?.value?.orgId || null;
      var userId = form.get(key)?.value?.userId || null;

      var duyet = form.get('duyet')?.value;

      if (!orgId || !userId) form.get('listNguoiBoPhanDuyet')!.setValue([]);
      else
        form
          .get('listNguoiBoPhanDuyet')!
          .setValue(
            this.getListNguoiBoPhanDuyet(
              _.cloneDeep(listOrganization),
              orgId,
              userId
            )
          );

      if (
        !duyet ||
        (duyet &&
          !this.checkPermissionManager(
            form.value.listNguoiBoPhanDuyet,
            duyet.orgId,
            duyet.userId
          ))
      ) {
        form
          .get('duyet')!
          .setValue(
            this.setInfoDefaulUserOfOrg(
              form.get('listNguoiBoPhanDuyet')!.value,
              userId
            )
          );
      }
    }
  }
}

export interface UserSelectorDto {
  userId: number | undefined;
  fullName: string;
  emailAddress: string;
  organizationId: string;
  organizationName: string;
  code: string;
}
