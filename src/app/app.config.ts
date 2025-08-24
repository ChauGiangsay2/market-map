import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MHttpInterceptor } from './core/interceptor/m.http.interceptor';
import { AppSessionService } from './shared/session/app-session.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import {
  API_SSO_URL,
} from './shared/service-proxies/sso-service-proxies';
import { ServiceProxiesModule } from './shared/service-proxies/service-proxies.module';
import { API_QLCV_URL } from './shared/service-proxies/qlcv-service-proxies';
import { LibServiceModule } from './shared/services/lib-service.module';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ServiceProxiesModule),
    importProvidersFrom(LibServiceModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AppSessionService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: MHttpInterceptor, multi: true },
    { provide: API_QLCV_URL, useValue: environment.apiQlcv },
    { provide: API_SSO_URL, useValue: environment.apiSSOUrl },
    MessageService

  ],
};

export function appInitializerFactory(
  appSessionService: AppSessionService
): () => Observable<any> {
  return () => appSessionService.init();
}
