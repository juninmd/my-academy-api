import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { PrismaService } from '../prisma.service';
import { TelegramService } from '../telegram/telegram.service';

describe('WorkoutsSessionsController', () => {
  let controller: WorkoutsSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsSessionsController],
      providers: [
        WorkoutsSessionsService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: TelegramService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<WorkoutsSessionsController>(
      WorkoutsSessionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
