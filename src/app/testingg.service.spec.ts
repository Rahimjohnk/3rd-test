import { TestBed } from '@angular/core/testing';

import { TestinggService } from './testingg.service';

describe('TestinggService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestinggService = TestBed.get(TestinggService);
    expect(service).toBeTruthy();
  });
});
