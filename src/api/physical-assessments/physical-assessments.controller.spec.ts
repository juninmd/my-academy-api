import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalAssessmentsController } from './physical-assessments.controller';

describe('PhysicalAssessmentsController', () => {
  let controller: PhysicalAssessmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalAssessmentsController],
    }).compile();

    controller = module.get<PhysicalAssessmentsController>(PhysicalAssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
