import { async, TestBed } from '@angular/core/testing';
import { GuiaDetallesComponent } from './guia-detalles.component';
describe('GuiaDetallesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GuiaDetallesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GuiaDetallesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=guia-detalles.component.spec.js.map