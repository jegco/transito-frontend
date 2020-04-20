import { TestBed } from '@angular/core/testing';

import { PuntoAtencionService } from './punto-atencion.service';

describe('PuntoAtencionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuntoAtencionService = TestBed.get(PuntoAtencionService);
    expect(service).toBeTruthy();
  });
});
