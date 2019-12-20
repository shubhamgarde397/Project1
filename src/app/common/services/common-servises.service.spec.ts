import { TestBed } from '@angular/core/testing';

import { CommonServisesService } from './common-servises.service';

describe('CommonServisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonServisesService = TestBed.get(CommonServisesService);
    expect(service).toBeTruthy();
  });
});
