import { TestBed } from '@angular/core/testing';

import { SuperUserGuardService } from './super-user-guard.service';

describe('SuperUserGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperUserGuardService = TestBed.get(SuperUserGuardService);
    expect(service).toBeTruthy();
  });
});
