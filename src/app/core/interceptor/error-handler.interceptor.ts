import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { catchError, Observable, retry, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagContentType } from '@angular/compiler';

export function ErrorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const matSnackBar = inject(MatSnackBar);

  const user = localStorage.getItem('user_token');
  const token:String = user ? JSON.parse(user).token : null;

  

  const authRequest = token ? req.clone({ setHeaders: { Authorization: `Token token_e2d4f17085b04a35c655c2f5148d6b7d`,'content-type': 'application/json',accept: '*/*' }  }) : req;

  return next(authRequest).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        const errorMessage: string = err.error.errors.body[0];
        matSnackBar.open(errorMessage, 'Dismiss', {
          duration: 5000,
        });
      },
    })
  );
}
