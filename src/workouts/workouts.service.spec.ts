import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsService } from './workouts.service';
import { PrismaService } from '../prisma.service';

describe('WorkoutsService', () => {
  let service: WorkoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        {
          provide: PrismaService,
          useValue: {
            workouts: {
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

    service = module.get<WorkoutsService>(WorkoutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
