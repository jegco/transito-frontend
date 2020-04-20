import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedDialFloatingButtonComponent } from './speed-dial-floating-button.component';

describe('SpeedDialFloatingButtonComponent', () => {
  let component: SpeedDialFloatingButtonComponent;
  let fixture: ComponentFixture<SpeedDialFloatingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedDialFloatingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedDialFloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
