import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesSeriesController } from './exercises-series.controller';
import { ExercisesSeriesService } from './exercises-series.service';

describe('ExercisesSeriesController', () => {
  let controller: ExercisesSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesSeriesController],
      providers: [ExercisesSeriesService],
    }).compile();

    controller = module.get<ExercisesSeriesController>(ExercisesSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
