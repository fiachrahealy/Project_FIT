import { TestBed } from '@angular/core/testing';

import { LoggedOutGuardService } from './logged-out-guard.service';

describe('LoggedOutGuardService', () => {
  let service: LoggedOutGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedOutGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
