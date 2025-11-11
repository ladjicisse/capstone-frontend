import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';

import { EnvService } from './env.service';

describe('EnvService', () => {
  let service: EnvService;

  beforeEach(() => {

    // (window as any).__env__ = {
    //   API_BASE_URL: 'https://mock-api.local',
    //   DYNATRACE_RUM_URL: 'https://mock-rum.local',
    //   FEATURE_FLAG_NEW_DASHBOARD: true,
    // };

    spyOn(document.head, 'appendChild').and.stub();

    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load values from window.__env__', () => {
    expect(service.getDynamicRumUrl()).toBe('assets/test-rum.js');
  });
});
