import { TestBed } from '@angular/core/testing';

import { SpeciesMediaService } from './species-media.service';

describe('SpeciesMediaService', () => {
  let service: SpeciesMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeciesMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
