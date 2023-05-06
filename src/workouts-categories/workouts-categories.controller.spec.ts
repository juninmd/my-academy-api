import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsCategoriesController } from './workouts-categories.controller';
import { WorkoutsCategoriesService } from './workouts-categories.service';

describe('WorkoutsCategoriesController', () => {
  let controller: WorkoutsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsCategoriesController],
      providers: [WorkoutsCategoriesService],
    }).compile();

    controller = module.get<WorkoutsCategoriesController>(WorkoutsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
