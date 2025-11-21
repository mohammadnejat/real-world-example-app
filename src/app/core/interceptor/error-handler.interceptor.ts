import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationStore } from '../../authentication/authentication.store';

export function ErrorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const matSnackBar = inject(MatSnackBar);
  const router = inject(Router);
  const authenticationStore = inject(AuthenticationStore);

  const token = authenticationStore.user()?.token;

  const authRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          'content-type': 'application/json',
          accept: '*/*',
        },
      })
    : req;

  return next(authRequest).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if ([401].includes(err.status)) {
          router.navigate(['/login']);
          authenticationStore.logout();
        }
        const errorMessage: string = err.error.errors.body[0];
        matSnackBar.open(errorMessage, 'Dismiss', {
          duration: 5000,
        });
      },
    })
  );
}
