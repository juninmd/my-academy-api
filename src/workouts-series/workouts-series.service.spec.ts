import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSeriesService } from './workouts-series.service';
import { PrismaService } from '../prisma.service';

describe('WorkoutsSeriesService', () => {
  let service: WorkoutsSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsSeriesService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<WorkoutsSeriesService>(WorkoutsSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
