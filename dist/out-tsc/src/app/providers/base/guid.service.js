import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let GuidService = class GuidService {
    constructor() { }
    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};
GuidService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GuidService);
export { GuidService };
//# sourceMappingURL=guid.service.js.map