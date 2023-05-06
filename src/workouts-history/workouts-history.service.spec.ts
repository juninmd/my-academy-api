import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsHistoryService } from './workouts-history.service';

describe('WorkoutsHistoryService', () => {
  let service: WorkoutsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsHistoryService],
    }).compile();

    service = module.get<WorkoutsHistoryService>(WorkoutsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
