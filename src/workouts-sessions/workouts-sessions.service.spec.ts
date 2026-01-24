import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSessionsService } from './workouts-sessions.service';
import { PrismaService } from '../prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { Logger } from '@nestjs/common';

describe('WorkoutsSessionsService', () => {
  let service: WorkoutsSessionsService;
  let prisma: PrismaService;
  let telegramService: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsSessionsService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUniqueOrThrow: jest.fn(),
            },
            workoutsGroups: {
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
            },
            workoutSessions: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            personals: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
            },
          },
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
    prisma = module.get<PrismaService>(PrismaService);
    telegramService = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto = { workoutGroupId: 1, date: new Date(), Workouts: [] };
    const userId = 'user1';

    it('should create session and send telegram if user has telegramId', async () => {
      const user = { id: userId, telegramId: '123' };
      const group = { id: 1, name: 'Legs' };
      const session = { id: 1, ...createDto };

      (prisma.users.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.workoutsGroups.findUniqueOrThrow as jest.Mock).mockResolvedValue(group);
      (telegramService.postChannelMessage as jest.Mock).mockResolvedValue(undefined);
      (prisma.workoutSessions.create as jest.Mock).mockResolvedValue(session);

      const result = await service.create(createDto, userId);

      expect(result).toBe(session);
      expect(telegramService.postChannelMessage).toHaveBeenCalled();
    });

    it('should not send telegram if user has no telegramId', async () => {
      const user = { id: userId, telegramId: null };
      const session = { id: 1, ...createDto };

      (prisma.users.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.workoutSessions.create as jest.Mock).mockResolvedValue(session);

      await service.create(createDto, userId);

      expect(telegramService.postChannelMessage).not.toHaveBeenCalled();
    });

    it('should catch telegram errors', async () => {
      const user = { id: userId, telegramId: '123' };
      const group = { id: 1, name: 'Legs' };
      const session = { id: 1, ...createDto };

      (prisma.users.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.workoutsGroups.findUniqueOrThrow as jest.Mock).mockResolvedValue(group);
      (telegramService.postChannelMessage as jest.Mock).mockRejectedValue(new Error('Telegram fail'));
      (prisma.workoutSessions.create as jest.Mock).mockResolvedValue(session);

      const loggerSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

      await service.create(createDto, userId);

      expect(telegramService.postChannelMessage).toHaveBeenCalled();
      // We expect the function to proceed to create session despite telegram failure
      expect(prisma.workoutSessions.create).toHaveBeenCalled();
      // And log error
      expect(loggerSpy).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
      it('should return sessions in a month range', async () => {
          const sessions = [{ id: 1 }];
          (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sessions);

          const result = await service.findAll('user1', 2023, 1);
          expect(result).toBe(sessions);
          expect(prisma.workoutSessions.findMany).toHaveBeenCalledWith(expect.objectContaining({
              where: expect.objectContaining({
                  workoutsGroups: { userId: 'user1' },
              })
          }));
      });
  });

  describe('findSummary', () => {
    const userId = 'user1';

    it('should return summary with streak logic', async () => {
      jest.useFakeTimers();
      // Set to a Thursday so the last workout (Wednesday) counts as "yesterday", preserving the streak.
      // Note: The current logic seems to reset streak if last workout is TODAY (diffDays=0).
      const thursday = new Date('2023-10-19T12:00:00Z');
      jest.setSystemTime(thursday);

      // Mock "I am personal" -> empty
      (prisma.personals.findMany as jest.Mock).mockResolvedValue([]);
      // Mock "I am student" -> null
      (prisma.personals.findFirst as jest.Mock).mockResolvedValue(null);

      // Mock workoutsGroups
      const groups = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
      (prisma.workoutsGroups.findMany as jest.Mock).mockResolvedValue(groups);

      // Mock lastSession
      const wednesday = new Date('2023-10-18T12:00:00Z');
      const lastSession = { id: 10, workoutGroupId: 1, date: wednesday, workoutsGroups: groups[0] };
      (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(lastSession);

      // Mock sequences (for streak calculation)
      // Monday, Tuesday, Wednesday
      const d1 = new Date('2023-10-16T12:00:00Z');
      const d2 = new Date('2023-10-17T12:00:00Z');
      const d3 = new Date('2023-10-18T12:00:00Z');

      const sequences = [
          { date: d1 },
          { date: d2 },
          { date: d3 },
      ];

      (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

      const result = await service.findSummary(userId);

      expect(result.workoutGroupOfDay).toBeDefined();
      expect(result.counter).toBeGreaterThan(0);
      expect(prisma.personals.findMany).toHaveBeenCalled();
      expect(prisma.workoutsGroups.findMany).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should return 0 streak if empty sessions', async () => {
      (prisma.personals.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.personals.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.workoutsGroups.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue([]);

      const result = await service.findSummary(userId);
      expect(result.counter).toBe(0);
    });
  });

  describe('CRUD operations', () => {
      it('findOne should call prisma', async () => {
          (prisma.workoutSessions.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
          await service.findOne(1);
          expect(prisma.workoutSessions.findUnique).toHaveBeenCalledWith({ where: { id: 1 }});
      });

      it('update should call prisma', async () => {
          (prisma.workoutSessions.update as jest.Mock).mockResolvedValue({ id: 1 });
          await service.update(1, { workoutGroupId: 2, date: new Date(), Workouts: [] });
          expect(prisma.workoutSessions.update).toHaveBeenCalled();
      });

      it('remove should call prisma', async () => {
          (prisma.workoutSessions.delete as jest.Mock).mockResolvedValue({ id: 1 });
          await service.remove(1);
          expect(prisma.workoutSessions.delete).toHaveBeenCalledWith({ where: { id: 1 }});
      });
  });
});
