import { TestBed } from '@angular/core/testing';

import { SupervisorServicesService } from './supervisor-services.service';

describe('SupervisorServicesService', () => {
  let service: SupervisorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupervisorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
