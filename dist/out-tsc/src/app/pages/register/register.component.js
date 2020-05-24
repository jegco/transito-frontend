import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
let RegisterComponent = class RegisterComponent extends BaseComponent {
    constructor(router, errorService, loginService, toast) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.loginService = loginService;
        this.toast = toast;
        this.showSpinner = false;
    }
    register() {
        if (this.username && this.password && this.email && this.phoneNumber) {
            if (this.confirmPassword === this.password) {
                this.showSpinner = true;
                this.loginService.register(this.username, this.email, this.password, this.phoneNumber)
                    .subscribe(() => {
                    this.showSpinner = false;
                    this.toast.success('usuario creado exitosamente');
                }, error => {
                    this.handleException(error);
                    this.showSpinner = false;
                });
            }
            else {
                this.errorMessage = 'Las contraseñas deben ser iguales';
            }
        }
    }
};
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.sass']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map