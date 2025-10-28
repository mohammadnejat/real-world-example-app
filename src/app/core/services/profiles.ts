import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserReponseModel } from '../models/authentication.model';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class Profiles {
  #http = inject(HttpClient);

  #profileBaseUrl = `/profiles`;
  #profileUrl = `${environment.basePath}/${this.#profileBaseUrl}`;


  getUserProfile(username: string): Observable<UserReponseModel> {
    return this.#http.get<UserReponseModel>(`${this.#profileUrl}/${username}`);
  }

  followUser(username: string): Observable<UserReponseModel> {
    return this.#http.post<UserReponseModel>(`${this.#profileUrl}/${username}/follow`, '');
  }

  unfollowUser(username: string): Observable<UserReponseModel> {
    return this.#http.post<UserReponseModel>(`${this.#profileUrl}/${username}/follow`, '');
  }
}
