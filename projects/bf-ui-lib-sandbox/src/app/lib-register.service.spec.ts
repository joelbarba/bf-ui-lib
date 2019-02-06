import { TestBed } from '@angular/core/testing';

import { LibRegisterService } from './lib-register.service';

describe('LibRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibRegisterService = TestBed.get(LibRegisterService);
    expect(service).toBeTruthy();
  });
});
