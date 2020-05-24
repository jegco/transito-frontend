import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
describe('AuthGuard', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(AuthGuard);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth-guard.spec.js.map