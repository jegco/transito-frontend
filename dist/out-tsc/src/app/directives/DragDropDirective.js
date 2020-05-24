import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
let DragDropDirective = class DragDropDirective {
    constructor() {
        this.onFileDropped = new EventEmitter();
        this.background = '#f5fcff';
        this.opacity = '1';
    }
    //Dragover listener
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    }
    //Dragleave listener
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
    }
    //Drop listener
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files);
        }
    }
};
tslib_1.__decorate([
    Output()
], DragDropDirective.prototype, "onFileDropped", void 0);
tslib_1.__decorate([
    HostBinding('style.background-color')
], DragDropDirective.prototype, "background", void 0);
tslib_1.__decorate([
    HostBinding('style.opacity')
], DragDropDirective.prototype, "opacity", void 0);
tslib_1.__decorate([
    HostListener('dragover', ['$event'])
], DragDropDirective.prototype, "onDragOver", null);
tslib_1.__decorate([
    HostListener('dragleave', ['$event'])
], DragDropDirective.prototype, "onDragLeave", null);
tslib_1.__decorate([
    HostListener('drop', ['$event'])
], DragDropDirective.prototype, "onDrop", null);
DragDropDirective = tslib_1.__decorate([
    Directive({
        selector: '[appDragDrop]'
    })
], DragDropDirective);
export { DragDropDirective };
//# sourceMappingURL=DragDropDirective.js.map