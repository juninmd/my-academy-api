import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsGroupsController } from './workouts-groups.controller';
import { WorkoutsGroupsService } from './workouts-groups.service';

describe('WorkoutsGroupsController', () => {
  let controller: WorkoutsGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsGroupsController],
      providers: [WorkoutsGroupsService],
    }).compile();

    controller = module.get<WorkoutsGroupsController>(WorkoutsGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
