import {
  ApplicationConfig, provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {EnvService} from './services/env.service';
import {
  MsalGuard,
  MsalInterceptor,
  MsalService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService
} from '@azure/msal-angular';

import { provideMsal as msalFactory, msalGuardConfig, msalInterceptorConfig } from './auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    //provideZonelessChangeDetection(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    EnvService,
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: async (envService: EnvService) => await msalFactory(envService),
    //   deps: [EnvService]
    // },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: msalGuardConfig,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: msalInterceptorConfig
    },
    MsalBroadcastService,
    MsalGuard,
    MsalService,
    {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true},
  ]
};

