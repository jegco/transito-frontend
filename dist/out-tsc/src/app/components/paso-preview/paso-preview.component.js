import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let PasoPreviewComponent = class PasoPreviewComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.descripcionComoHTML = (paso) => {
            return this.sanitizer.bypassSecurityTrustHtml(paso.descripcion);
        };
        this.colorPrimario = localStorage.getItem('colorPrimario');
    }
};
tslib_1.__decorate([
    Input()
], PasoPreviewComponent.prototype, "paso", void 0);
tslib_1.__decorate([
    Input()
], PasoPreviewComponent.prototype, "index", void 0);
PasoPreviewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-paso-preview',
        templateUrl: './paso-preview.component.html',
        styleUrls: ['./paso-preview.component.css']
    })
], PasoPreviewComponent);
export { PasoPreviewComponent };
//# sourceMappingURL=paso-preview.component.js.map