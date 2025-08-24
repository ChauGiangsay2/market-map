// import * as ClassicEditor from 'src/assets/js/ckeditorV31/ckeditor.js';

export class AppConst {
  static readonly authorization = {
    encrptedAuthTokenName: 'enc_auth_token',
    authToken: 'AuthToken',
  };

  static readonly idZero = '00000000-0000-0000-0000-000000000000';

  static readonly sharedKey = 'tn_share_key';

  static readonly messageToastr = {
    success: {
      insert: 'Thêm thành công!',
      update: 'Cập nhật thành công!',
      delete: 'Xóa thành công!',
    },
    error: {
      insert: 'Thêm thất bại!',
      update: 'Cập nhật thất bại!',
      delete: 'Xóa thất bại!',
    },
  };


  static readonly logoQlcvUrl = './maps.jpg';

  // static readonly editor = ClassicEditor;
  static readonly placehoderImage = 'https://placehold.co/300x200';

}
