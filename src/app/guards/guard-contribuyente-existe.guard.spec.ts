import { TestBed } from '@angular/core/testing';

import { GuardContribuyenteExisteGuard } from './guard-contribuyente-existe.guard';

describe('GuardContribuyenteExisteGuard', () => {
  let guard: GuardContribuyenteExisteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardContribuyenteExisteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
