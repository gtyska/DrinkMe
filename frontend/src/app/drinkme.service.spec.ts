import { TestBed } from '@angular/core/testing';

import { DrinkmeService } from './drinkme.service';

describe('DrinkmeService', () => {
  let service: DrinkmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinkmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
