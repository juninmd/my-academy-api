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
          useValue: {
            workoutSeries: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WorkoutsSeriesService>(WorkoutsSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
