import { TestBed } from '@angular/core/testing';

import { CopierService } from './copier.service';

describe('CopierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopierService = TestBed.get(CopierService);
    expect(service).toBeTruthy();
  });
});
