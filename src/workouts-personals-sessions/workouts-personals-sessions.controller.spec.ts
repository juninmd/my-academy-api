import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsPersonalsSessionsController } from './workouts-personals-sessions.controller';
import { WorkoutsPersonalsSessionsService } from './workouts-personals-sessions.service';

describe('WorkoutsPersonalsSessionsController', () => {
  let controller: WorkoutsPersonalsSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsPersonalsSessionsController],
      providers: [WorkoutsPersonalsSessionsService],
    }).compile();

    controller = module.get<WorkoutsPersonalsSessionsController>(
      WorkoutsPersonalsSessionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
