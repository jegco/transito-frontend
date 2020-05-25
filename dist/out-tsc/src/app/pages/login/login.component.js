import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
let LoginComponent = class LoginComponent extends BaseComponent {
    constructor(router, errorService, loginService, toast) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.loginService = loginService;
        this.toast = toast;
        this.showSpinner = false;
    }
    ngOnInit() {
        if (localStorage.getItem('token') !== null) {
            this.router.navigate(['/dashboard']);
        }
    }
    login() {
        this.showSpinner = true;
        if (this.username && this.password) {
            this.loginService.login(this.username, this.password)
                .subscribe(() => {
                this.showSpinner = false;
                this.router.navigate(['/dashboard']);
            }, error => {
                this.showSpinner = false;
                this.handleException(error);
            });
        }
        else {
            this.showSpinner = false;
        }
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map