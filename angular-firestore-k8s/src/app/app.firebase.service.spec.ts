import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './app.firebase.service';

describe('App.FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});
