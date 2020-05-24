import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/usuarios';
    }
    login(username, password) {
        const loginParam = { 'nombreUsuario': username, 'password': password, 'active': true };
        return this.http.post(this.url + '/login', loginParam)
            .pipe(map(resp => {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('username', username);
            localStorage.setItem('rol', resp.role);
            return resp.token;
        }));
    }
    register(username, email, password, phoneNumber) {
        const user = new User(null, username, email, password, phoneNumber, false, "ADMIN");
        return this.http.post(this.url, user);
    }
    buscarUsuarios() {
        return this.http.get(this.url);
    }
    modificarUsuario(usuario) {
        return this.http.put(this.url, usuario);
    }
    eliminarUsuario(usuario) {
        return this.http.delete(this.url, usuario);
    }
};
LoginService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map