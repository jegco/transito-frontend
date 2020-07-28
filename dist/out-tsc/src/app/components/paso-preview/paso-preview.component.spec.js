import { async, TestBed } from '@angular/core/testing';
import { PasoPreviewComponent } from './paso-preview.component';
describe('PasoComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasoPreviewComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PasoPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=paso-preview.component.spec.js.map