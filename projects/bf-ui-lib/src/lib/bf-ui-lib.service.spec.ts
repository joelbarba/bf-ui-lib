import { TestBed } from '@angular/core/testing';

import { BfUiLibService } from './bf-ui-lib.service';

describe('BfUiLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BfUiLibService = TestBed.inject(BfUiLibService);
    expect(service).toBeTruthy();
  });
});
