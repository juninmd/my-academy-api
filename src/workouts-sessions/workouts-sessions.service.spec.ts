import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSessionsService } from './workouts-sessions.service';

describe('WorkoutsSessionsService', () => {
  let service: WorkoutsSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsSessionsService],
    }).compile();

    service = module.get<WorkoutsSessionsService>(WorkoutsSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
