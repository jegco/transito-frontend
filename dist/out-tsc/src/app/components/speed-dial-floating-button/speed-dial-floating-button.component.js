import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
let SpeedDialFloatingButtonComponent = class SpeedDialFloatingButtonComponent {
    constructor() {
        this.actionBtn = new EventEmitter();
        this.buttons = [];
        this.fabTogglerState = 'inactive';
    }
    showItems() {
        this.fabTogglerState = 'active';
        this.buttons = this.fabButtons;
    }
    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons = [];
    }
    onToggleFab() {
        this.buttons.length ? this.hideItems() : this.showItems();
    }
    onAction(action) {
        this.actionBtn.emit(action);
    }
};
tslib_1.__decorate([
    Input()
], SpeedDialFloatingButtonComponent.prototype, "fabButtons", void 0);
tslib_1.__decorate([
    Output()
], SpeedDialFloatingButtonComponent.prototype, "actionBtn", void 0);
SpeedDialFloatingButtonComponent = tslib_1.__decorate([
    Component({
        selector: 'app-speed-dial-floating-button',
        templateUrl: './speed-dial-floating-button.component.html',
        styleUrls: ['./speed-dial-floating-button.component.css'],
        animations: [speedDialFabAnimations]
    })
], SpeedDialFloatingButtonComponent);
export { SpeedDialFloatingButtonComponent };
//# sourceMappingURL=speed-dial-floating-button.component.js.map