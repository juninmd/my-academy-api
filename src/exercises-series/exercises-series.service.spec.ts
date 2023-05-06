import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesSeriesService } from './exercises-series.service';

describe('ExercisesSeriesService', () => {
  let service: ExercisesSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisesSeriesService],
    }).compile();

    service = module.get<ExercisesSeriesService>(ExercisesSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
