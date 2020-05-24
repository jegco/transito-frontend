import { TestBed } from '@angular/core/testing';
import { GuidService } from './guid.service';
describe('GuidService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(GuidService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=guid.service.spec.js.map