import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor() { }
    canActivate() {
        return localStorage.getItem('rol') === 'SUPER_ADMIN';
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth-guard.js.map