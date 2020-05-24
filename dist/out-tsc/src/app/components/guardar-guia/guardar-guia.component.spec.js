import { async, TestBed } from '@angular/core/testing';
import { GuardarGuiaComponent } from './guardar-guia.component';
describe('GuardarGuiaComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GuardarGuiaComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GuardarGuiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=guardar-guia.component.spec.js.map