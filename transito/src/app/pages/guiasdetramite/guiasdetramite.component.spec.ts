import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasdetramiteComponent } from './guiasdetramite.component';

describe('GuiasdetramiteComponent', () => {
  let component: GuiasdetramiteComponent;
  let fixture: ComponentFixture<GuiasdetramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiasdetramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasdetramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
