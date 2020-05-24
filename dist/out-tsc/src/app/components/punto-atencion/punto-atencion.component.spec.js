import { async, TestBed } from '@angular/core/testing';
import { PuntoAtencionComponent } from './punto-atencion.component';
describe('PuntoAtencionComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PuntoAtencionComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PuntoAtencionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=punto-atencion.component.spec.js.map