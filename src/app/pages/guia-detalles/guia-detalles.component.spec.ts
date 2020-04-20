import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaDetallesComponent } from './guia-detalles.component';

describe('GuiaDetallesComponent', () => {
  let component: GuiaDetallesComponent;
  let fixture: ComponentFixture<GuiaDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaDetallesComponent ]
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
