import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalAssessmentsService } from './physical-assessments.service';

describe('PhysicalAssessmentsService', () => {
  let service: PhysicalAssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalAssessmentsService],
    }).compile();

    service = module.get<PhysicalAssessmentsService>(PhysicalAssessmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
