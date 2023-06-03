import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSeriesService } from './workouts-series.service';

describe('WorkoutsSeriesService', () => {
  let service: WorkoutsSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsSeriesService],
    }).compile();

    service = module.get<WorkoutsSeriesService>(WorkoutsSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
