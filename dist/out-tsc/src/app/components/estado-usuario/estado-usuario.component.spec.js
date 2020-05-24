import { async, TestBed } from '@angular/core/testing';
import { EstadoUsuarioComponent } from './estado-usuario.component';
describe('EstadoUsuarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EstadoUsuarioComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EstadoUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=estado-usuario.component.spec.js.map