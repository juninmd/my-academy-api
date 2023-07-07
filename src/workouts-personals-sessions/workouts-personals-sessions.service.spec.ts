import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsPersonalsSessionsService } from './workouts-personals-sessions.service';

describe('WorkoutsPersonalsSessionsService', () => {
  let service: WorkoutsPersonalsSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsPersonalsSessionsService],
    }).compile();

    service = module.get<WorkoutsPersonalsSessionsService>(
      WorkoutsPersonalsSessionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
