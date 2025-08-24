import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppConst } from '../app-const';
import { environment } from '../../../environments/environment.development';
import {
  SSO_UserServiceProxy,
  UserDto,
} from '../service-proxies/sso-service-proxies';
import { ShareKeyDto } from '../service-proxies/qlcv-service-proxies';

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  user: UserDto | null = null;
  sharedKey: ShareKeyDto | undefined;

  constructor(
    private SSO_UserServiceProxy: SSO_UserServiceProxy,
    private cookieService: CookieService
  ) {}

  get userId() {
    return this.user?.id;
  }

  init() {
    return new Observable((subscriber) => {
      let token = this.cookieService.get(AppConst.authorization.authToken);

      if (token)
        this.SSO_UserServiceProxy.getCurrentUser().subscribe(
          (res) => {
            this.user = res;

            var sharedKey = this.cookieService.get(AppConst.sharedKey);

            if (sharedKey && sharedKey != '') {
                this.sharedKey = ShareKeyDto.fromJS(JSON.parse(sharedKey));

                if (this.sharedKey.currentUserId != this.user.id) {
                    this.cookieService.delete(AppConst.sharedKey, '/');
                    this.sharedKey = undefined;
                }
            }

            // subscriber.complete();
          },
          (error) => {
            
            this.cookieService.deleteAll('/', environment.domain);
            // location.href = environment.loginUrl;

            // subscriber.complete();
          },
          () => subscriber.complete()
        );
      else subscriber.complete();
    });
  }

  logout() {
    this.cookieService.deleteAll('/', environment.domain);
    location.href = environment.loginUrl;
  }
}
