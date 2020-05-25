import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let PasoComponent = class PasoComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.descripcionComoHTML = (descripcion) => {
            return this.sanitizer.bypassSecurityTrustHtml(descripcion);
        };
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input()
], PasoComponent.prototype, "paso", void 0);
tslib_1.__decorate([
    Input()
], PasoComponent.prototype, "index", void 0);
PasoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-paso',
        templateUrl: './paso.component.html',
        styleUrls: ['./paso.component.css']
    })
], PasoComponent);
export { PasoComponent };
//# sourceMappingURL=paso.component.js.map