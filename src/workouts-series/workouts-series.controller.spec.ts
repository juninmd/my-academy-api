import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSeriesController } from './workouts-series.controller';
import { WorkoutsSeriesService } from './workouts-series.service';

describe('WorkoutsSeriesController', () => {
  let controller: WorkoutsSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsSeriesController],
      providers: [WorkoutsSeriesService],
    }).compile();

    controller = module.get<WorkoutsSeriesController>(WorkoutsSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
