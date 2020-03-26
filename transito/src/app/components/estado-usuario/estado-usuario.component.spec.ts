import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoUsuarioComponent } from './estado-usuario.component';

describe('EstadoUsuarioComponent', () => {
  let component: EstadoUsuarioComponent;
  let fixture: ComponentFixture<EstadoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoUsuarioComponent ]
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
