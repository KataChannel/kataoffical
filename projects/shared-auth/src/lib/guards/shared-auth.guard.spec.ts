import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sharedAuthGuard } from './shared-auth.guard';

describe('sharedAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sharedAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
