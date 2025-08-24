import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConst } from '../../app-const';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.scss'],
  standalone: true,
})
export class SetTokenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private cookieSerivce: CookieService
  ) {}

  ngOnInit(): void {
    const fragments = this.activatedRoute.snapshot.fragment;

    if (!fragments) {
      this.route.navigate(['/home']);
    } else {
      var list = fragments.split('#');
      var accessToken = list[0];
      var encryptedAccessToken = list[1];
      var expireInSeconds = list.length > 1 ? parseInt(list[2]) : -1;
      var tokenExpireDate = new Date();
      if (expireInSeconds > -1) tokenExpireDate.setSeconds(expireInSeconds);

      this.cookieSerivce.set(
        AppConst.authorization.authToken,
        accessToken,
        tokenExpireDate,
        '/',
        environment.domain
      );

      this.cookieSerivce.set(
        AppConst.authorization.encrptedAuthTokenName,
        encryptedAccessToken,
        tokenExpireDate,
        '/',
        environment.domain
      );

      // document.cookie = `${
      //   AppConst.authorization.authToken
      // }=${accessToken}; expires=${tokenExpireDate.toUTCString()}; path=/`;
      // document.cookie = `${
      //   AppConst.authorization.encrptedAuthTokenName
      // }=${encryptedAccessToken}; expires=${tokenExpireDate.toUTCString()}; path=/`;

      var urlRedirect = list[3];
      window.location.href = urlRedirect ? urlRedirect : environment.clientUrl;
    }
  }
}
