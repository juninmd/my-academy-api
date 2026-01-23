import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { PrismaService } from '../prisma.service';
import { TelegramService } from '../telegram/telegram.service';

describe('WorkoutsSessionsService', () => {
  let service: WorkoutsSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsSessionsService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: TelegramService,
          useValue: {
            postChannelMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorkoutsSessionsService>(WorkoutsSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
