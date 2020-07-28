import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoPreviewComponent } from './paso-preview.component';

describe('PasoComponent', () => {
  let component: PasoPreviewComponent;
  let fixture: ComponentFixture<PasoPreviewComponent>;

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
