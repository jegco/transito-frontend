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
    const loginParam = { 'nombreUsuario': username, 'password': password, 'active': true };
    return this.http.post<any, Token>(this.url + '/login', loginParam)
      .pipe(map(resp => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('username', username);
        localStorage.setItem('rol', resp.role);
        return resp.token;
      }));
  }

  register(username: string, email: string, password: string, phoneNumber: number) {
    const user = new User(null, username, email, password, phoneNumber, false, "ADMIN");
    return this.http.post(this.url, user);
  }

  buscarUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  modificarUsuario(usuario: User): Observable<boolean> {
    return this.http.put<User, boolean>(this.url, usuario);
  }

  eliminarUsuario(usuario: User): Observable<User> {
    return this.http.delete<User, User>(this.url, usuario);
  }
}
