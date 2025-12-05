import { TestBed } from '@angular/core/testing';

import { PlanoAccaoService } from './plano-accao.service';

describe('PlanoAccaoService', () => {
  let service: PlanoAccaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoAccaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
