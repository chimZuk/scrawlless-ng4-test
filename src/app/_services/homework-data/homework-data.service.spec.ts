import { TestBed, inject } from '@angular/core/testing';

import { HomeworkDataService } from './homework-data.service';

describe('HomeworkDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeworkDataService]
    });
  });

  it('should be created', inject([HomeworkDataService], (service: HomeworkDataService) => {
    expect(service).toBeTruthy();
  }));
});
