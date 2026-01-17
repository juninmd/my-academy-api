import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsGroupsService } from './workouts-groups.service';

describe('WorkoutsGroupsService', () => {
  let service: WorkoutsGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsGroupsService],
    }).compile();

    service = module.get<WorkoutsGroupsService>(WorkoutsGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
