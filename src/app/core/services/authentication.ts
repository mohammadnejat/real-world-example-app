import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginPayloadModel, UserReponseModel } from '../models/authentication.model';
import { Observable } from 'rxjs';

@Injectable()
export class Authentication {
  #http = inject(HttpClient);
  login(payload: LoginPayloadModel): Observable<UserReponseModel> {
    return this.#http.post<UserReponseModel>(`${environment.basePath}users/login`, payload);
  }
}
