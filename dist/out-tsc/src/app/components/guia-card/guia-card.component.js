import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let GuiaCardComponent = class GuiaCardComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.actualizaGuia = new EventEmitter();
        this.eliminaGuia = new EventEmitter();
        this.descripcion = {};
    }
    actualizarGuia(guia) {
        this.actualizaGuia.emit(guia);
    }
    descripcionComoHTML(descripcion) {
        return this.sanitizer.bypassSecurityTrustHtml(descripcion);
    }
    eliminarGuia(guia) {
        this.eliminaGuia.emit(guia);
    }
};
tslib_1.__decorate([
    Input()
], GuiaCardComponent.prototype, "guia", void 0);
tslib_1.__decorate([
    Output()
], GuiaCardComponent.prototype, "actualizaGuia", void 0);
tslib_1.__decorate([
    Output()
], GuiaCardComponent.prototype, "eliminaGuia", void 0);
GuiaCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-guia-card',
        templateUrl: './guia-card.component.html',
        styleUrls: ['./guia-card.component.css']
    })
], GuiaCardComponent);
export { GuiaCardComponent };
//# sourceMappingURL=guia-card.component.js.map