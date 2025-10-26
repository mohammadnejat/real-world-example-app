import {
  makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './core/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptor/error-handler.interceptor';

export function providers() {
  return makeEnvironmentProviders([
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorHandlerInterceptor])),
  ]);
}
