import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let BaseComponent = class BaseComponent {
    constructor(router, errorService, toast) {
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.platform = new H.service.Platform({
            "apikey": "BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw"
        });
    }
    openPage(routename) {
        this.router.navigateByUrl(`${routename}`);
    }
    handleException(error) {
        const handledError = this.errorService.handleException(error);
        if (handledError.toastNotifiation) {
            this.toast.error(handledError.message);
        }
        else {
            debugger;
            this.errorMessage = handledError.message;
        }
    }
    mostrarOpcionesSuperAdmin() {
        return localStorage.getItem('rol') === 'SUPER_ADMIN';
    }
};
BaseComponent = tslib_1.__decorate([
    Component({
        selector: 'app-base',
        templateUrl: './base.component.html',
        styleUrls: ['./base.component.sass']
    })
], BaseComponent);
export { BaseComponent };
//# sourceMappingURL=base.component.js.map