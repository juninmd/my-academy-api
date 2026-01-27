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

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto = { workoutGroupId: 1, date: new Date() };
    const userId = 'user1';

    it('should create session and send telegram if user has telegramId', async () => {
      const user = { id: userId, telegramId: '123' };
      const group = { id: 1, name: 'Legs' };
      const session = { id: 1, ...createDto };

      (prisma.users.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.workoutsGroups.findUniqueOrThrow as jest.Mock).mockResolvedValue(
        group,
      );
      (telegramService.postChannelMessage as jest.Mock).mockResolvedValue(
        undefined,
      );
      (prisma.workoutSessions.create as jest.Mock).mockResolvedValue(session);

      const result = await service.create(createDto as any, userId);

      expect(result).toBe(session);
      expect(telegramService.postChannelMessage).toHaveBeenCalled();
    });

    it('should not send telegram if user has no telegramId', async () => {
      const user = { id: userId, telegramId: null };
      const session = { id: 1, ...createDto };

      (prisma.users.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.workoutSessions.create as jest.Mock).mockResolvedValue(session);

      await service.create(createDto as any, userId);

      expect(telegramService.postChannelMessage).not.toHaveBeenCalled();
    });

    it('should catch telegram errors', async () => {
      const user = { id: userId, telegramId: '123' };
      const group = { id: 1, name: 'Legs' };
      const session = { id: 1, ...createDto };

      (prisma.users.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);
      (prisma.workoutsGroups.findUniqueOrThrow as jest.Mock).mockResolvedValue(
        group,
      );
      (telegramService.postChannelMessage as jest.Mock).mockRejectedValue(
        new Error('Telegram fail'),
      );
      (prisma.workoutSessions.create as jest.Mock).mockResolvedValue(session);

      const loggerSpy = jest
        .spyOn(Logger.prototype, 'error')
        .mockImplementation(() => {});

      await service.create(createDto as any, userId);

      expect(telegramService.postChannelMessage).toHaveBeenCalled();
      expect(prisma.workoutSessions.create).toHaveBeenCalled();
      expect(loggerSpy).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return sessions in a month range', async () => {
      const sessions = [{ id: 1 }];
      (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(
        sessions,
      );

      const result = await service.findAll('user1', 2023, 1);
      expect(result).toBe(sessions);
      expect(prisma.workoutSessions.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            workoutsGroups: { userId: 'user1' },
          }),
        }),
      );
    });
  });

  describe('findSummary & calculateSequence', () => {
    const userId = 'user1';

    beforeEach(() => {
        // Default mocks
        (prisma.personals.findMany as jest.Mock).mockResolvedValue([]);
        (prisma.personals.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.workoutsGroups.findMany as jest.Mock).mockResolvedValue([]);
        (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue([]);
    });

    it('should return 0 streak if empty sessions', async () => {
      const result = await service.findSummary(userId);
      expect(result.counter).toBe(0);
    });

    it('should handle iAmPersonal and iAmStudent', async () => {
      (prisma.personals.findMany as jest.Mock).mockResolvedValue([
        { StudentUser: { id: 's1' } },
      ]);
      (prisma.personals.findFirst as jest.Mock).mockResolvedValue({
        PersonalUser: { id: 'p1' },
      });

      const result = await service.findSummary(userId);
      expect(result.students).toHaveLength(1);
      expect(result.personal).toEqual({ id: 'p1' });
    });

    it('should calculate sequence with consecutive days', async () => {
      // Mon 16, Tue 17, Wed 18 (Today is Thu 19)
      jest.useFakeTimers();
      const thursday = new Date('2023-10-19T12:00:00Z');
      jest.setSystemTime(thursday);

      const d1 = new Date('2023-10-16T12:00:00Z');
      const d2 = new Date('2023-10-17T12:00:00Z');
      const d3 = new Date('2023-10-18T12:00:00Z');

      const sequences = [{ date: d1 }, { date: d2 }, { date: d3 }];
      (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

      const result = await service.findSummary(userId);
      // d1 (1), d2(2), d3(3). Gap to today is 1 day. So 3.
      expect(result.counter).toBe(3);
    });

    it('should calculate sequence across weekend (Sat -> Mon)', async () => {
        // Sat 14, Mon 16 (Today is Tue 17 to avoid same-day gap issue)
        jest.useFakeTimers();
        const tuesday = new Date('2023-10-17T12:00:00Z');
        jest.setSystemTime(tuesday);

        const d1 = new Date('2023-10-14T12:00:00Z'); // Sat
        const d2 = new Date('2023-10-16T12:00:00Z'); // Mon

        const sequences = [{ date: d1 }, { date: d2 }];
        (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

        const result = await service.findSummary(userId);
        // d1(1), d2 is Mon and prev is Sat -> increment -> 2.
        // Last date Mon 16. Today Tue 17. diffDays = 1. OK.
        expect(result.counter).toBe(2);
    });

    it('should break sequence if gap is large', async () => {
        jest.useFakeTimers();
        const friday = new Date('2023-10-20T12:00:00Z');
        jest.setSystemTime(friday);

        const d1 = new Date('2023-10-01T12:00:00Z');
        const d2 = new Date('2023-10-05T12:00:00Z');

        const sequences = [{ date: d1 }, { date: d2 }];
        (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

        const result = await service.findSummary(userId);
        // Gap > 1. Counter resets.
        // Also gap from last date (5th) to today (20th) is large.
        expect(result.counter).toBe(0);
    });

    it('should handle same day sequence (reset to 1)', async () => {
       jest.useFakeTimers();
       // To hit the "else { currentSequence = 1 }" block, we need diffDays != 1 AND diffDays <= 1.
       // Since diffDays = ceil(diffTime), it must be 0. So identical timestamps.
       const today = new Date('2023-10-21T09:00:00Z'); // Saturday. <24h from Friday 10:00
       jest.setSystemTime(today);

       const d1 = new Date('2023-10-20T10:00:00Z');
       const d2 = new Date('2023-10-20T10:00:00Z'); // Same time

       const sequences = [{ date: d1 }, { date: d2 }];
       (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

       const result = await service.findSummary(userId);
       // i=0 -> seq=1.
       // i=1 -> diffDays=0. canIncrement=false.
       // diffDays > 1 (0>1) false.
       // else -> currentSequence = 1.
       // End loop.
       // LastDate 20th. Today 21st. diffDays=1. OK.
       expect(result.counter).toBe(1);
    });

    it('should determine correct workoutGroupOfDay', async () => {
        jest.useFakeTimers();
        const today = new Date('2023-10-20T12:00:00Z');
        jest.setSystemTime(today);

        const groups = [{ id: 1 }, { id: 2 }];
        (prisma.workoutsGroups.findMany as jest.Mock).mockResolvedValue(groups);

        // Case 1: lastSession is yesterday, group 1. Next should be group 2.
        let lastSession = { id: 1, workoutGroupId: 1, date: new Date('2023-10-19T12:00:00Z'), workoutsGroups: groups[0] };
        (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(lastSession);

        let result = await service.findSummary(userId);
        expect(result.workoutGroupOfDay).toBe(groups[1]);

        // Case 2: lastSession is yesterday, group 2. Next should be group 1 (loop).
        lastSession = { id: 1, workoutGroupId: 2, date: new Date('2023-10-19T12:00:00Z'), workoutsGroups: groups[1] };
        (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(lastSession);

        result = await service.findSummary(userId);
        expect(result.workoutGroupOfDay).toBe(groups[0]);

         // Case 3: No last session -> Group 0
         (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(null);
         result = await service.findSummary(userId);
         expect(result.workoutGroupOfDay).toBe(groups[0]);

         // Case 4: Last session is today -> Return that group
         lastSession = { id: 1, workoutGroupId: 2, date: new Date('2023-10-20T10:00:00Z'), workoutsGroups: groups[1] };
         (prisma.workoutSessions.findFirst as jest.Mock).mockResolvedValue(lastSession);
         result = await service.findSummary(userId);
         expect(result.workoutGroupOfDay).toBe(groups[1]);
    });

    it('should ignore Sunday in calculateSequence loop', async () => {
        jest.useFakeTimers();
        const monday = new Date('2023-10-23T12:00:00Z');
        jest.setSystemTime(monday);

        // Sunday 22nd
        const sunday = new Date('2023-10-22T12:00:00Z');
        const saturday = new Date('2023-10-21T12:00:00Z');

        const sequences = [{ date: saturday }, { date: sunday }];
        (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

        const result = await service.findSummary(userId);
        // Sunday is skipped in loop. Saturday is processed (i=0 -> seq=1).
        // Then loop finishes.
        // Last date is Sunday. diffTime from Mon to Sun is 1 day.

        expect(result.counter).toBe(1);
    });

    it('should maintain streak if last workout was Saturday and today is Monday (end check)', async () => {
        jest.useFakeTimers();
        const monday = new Date('2023-10-16T12:00:00Z');
        jest.setSystemTime(monday);

        const saturday = new Date('2023-10-14T12:00:00Z');
        const sequences = [{ date: saturday }];
        (prisma.workoutSessions.findMany as jest.Mock).mockResolvedValue(sequences);

        const result = await service.findSummary(userId);

        // i=0. seq=1.
        // End loop.
        // LastDate Sat. Current Mon. diffDays=2.
        // (Sat && Mon) is True.
        // Streak maintained.
        expect(result.counter).toBe(1);
    });
  });

  describe('CRUD operations', () => {
    it('findOne should call prisma', async () => {
      (prisma.workoutSessions.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
      });
      await service.findOne(1);
      expect(prisma.workoutSessions.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('update should call prisma', async () => {
      (prisma.workoutSessions.update as jest.Mock).mockResolvedValue({ id: 1 });
      await service.update(1, { workoutGroupId: 2, date: new Date() } as any);
      expect(prisma.workoutSessions.update).toHaveBeenCalled();
    });

    it('remove should call prisma', async () => {
      (prisma.workoutSessions.delete as jest.Mock).mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(prisma.workoutSessions.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('getStartDateOfWeek and getEndDateOfWeek', () => {
    it('getStartDateOfWeek', () => {
      const date = service.getStartDateOfWeek(1);
      expect(date).toBeInstanceOf(Date);
    });
    it('getEndDateOfWeek', () => {
      const date = service.getEndDateOfWeek(1);
      expect(date).toBeInstanceOf(Date);
    });
  });
});
