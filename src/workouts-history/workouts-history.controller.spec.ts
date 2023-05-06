import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsHistoryController } from './workouts-history.controller';
import { WorkoutsHistoryService } from './workouts-history.service';

describe('WorkoutsHistoryController', () => {
  let controller: WorkoutsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsHistoryController],
      providers: [WorkoutsHistoryService],
    }).compile();

    controller = module.get<WorkoutsHistoryController>(WorkoutsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
