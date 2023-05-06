import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsCategoriesService } from './workouts-categories.service';

describe('WorkoutsCategoriesService', () => {
  let service: WorkoutsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsCategoriesService],
    }).compile();

    service = module.get<WorkoutsCategoriesService>(WorkoutsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
