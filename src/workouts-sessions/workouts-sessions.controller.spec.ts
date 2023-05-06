import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { WorkoutsSessionsService } from './workouts-sessions.service';

describe('WorkoutsSessionsController', () => {
  let controller: WorkoutsSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsSessionsController],
      providers: [WorkoutsSessionsService],
    }).compile();

    controller = module.get<WorkoutsSessionsController>(WorkoutsSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
