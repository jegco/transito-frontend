import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaItemComponent } from './guia-item.component';

describe('GuiaItemComponent', () => {
  let component: GuiaItemComponent;
  let fixture: ComponentFixture<GuiaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
