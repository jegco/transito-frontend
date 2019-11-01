import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Token } from 'src/app/models/Token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = ENV.serverUrl + '/usuarios';

  constructor(private readonly http: HttpService) { }

  login(username: string, password: string): Observable<string> {
    const loginParam = { 'nombreUsuario': username, 'password': password };
    return this.http.post<any, Token>(this.url + '/login', loginParam)
      .pipe(map(resp => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('username', username);
        return resp.token;
      }));
  }

  register(username: string, name: string, password: string) {
    const user = new User(null, username, name, password);
    return this.http.post(this.url, user);
  }
}
