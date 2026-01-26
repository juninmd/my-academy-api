import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsGroupsService } from './workouts-groups.service';
import { PrismaService } from '../prisma.service';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { NotFoundException } from '@nestjs/common';

describe('WorkoutsGroupsService', () => {
  let service: WorkoutsGroupsService;
  let prisma: PrismaService;

  const mockPrisma = {
    $transaction: jest.fn().mockImplementation((cb) => cb(mockPrisma)),
    workoutsGroups: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    workouts: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsGroupsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<WorkoutsGroupsService>(WorkoutsGroupsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a workout group with nested workouts', async () => {
      const dto: CreateWorkoutsGroupDto = {
        name: 'Group A',
        image: 'img.jpg',
        userId: 'user1',
        workouts: [
          {
            exerciseId: 1,
            description: 'desc',
            methodId: 2,
            workoutSeries: [{ repetitions: 10, weight: 20, rest: 60 }],
          },
        ],
      };

      const result = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.workoutsGroups.create as jest.Mock).mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);

      expect(prisma.workoutsGroups.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: dto.name,
          workouts: {
            create: expect.any(Array),
          },
        }),
      });
    });
  });

  describe('update', () => {
    it('should delete existing workouts and update group', async () => {
      const dto = {
        name: 'Group A Updated',
        image: 'img.jpg',
        userId: 'user1',
        workouts: [],
      };
      const result = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock findUnique for findOne check
      (prisma.workoutsGroups.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
      });

      (prisma.workouts.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });
      (prisma.workoutsGroups.update as jest.Mock).mockResolvedValue(result);

      expect(await service.update(1, dto)).toBe(result);

      expect(prisma.workoutsGroups.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
      expect(prisma.workouts.deleteMany).toHaveBeenCalledWith({
        where: { workoutsGroupsId: 1 },
      });
      expect(prisma.workoutsGroups.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          data: expect.objectContaining({ name: dto.name }),
        }),
      );
    });

    it('should throw NotFoundException if group not found', async () => {
      (prisma.workoutsGroups.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.update(1, {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all groups for a user', async () => {
      const result = [{ id: 1 }];
      (prisma.workoutsGroups.findMany as jest.Mock).mockResolvedValue(result);
      expect(await service.findAll('user1')).toBe(result);
      expect(prisma.workoutsGroups.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      });
    });
  });

  describe('findOne & findAllExercises', () => {
    it('should return one group with relations', async () => {
      const result = { id: 1 };
      (prisma.workoutsGroups.findUnique as jest.Mock).mockResolvedValue(result);

      await service.findOne(1);
      expect(prisma.workoutsGroups.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          include: expect.anything(),
        }),
      );
    });

    it('findAllExercises should act like findOne', async () => {
      const result = { id: 1 };
      (prisma.workoutsGroups.findUnique as jest.Mock).mockResolvedValue(result);

      await service.findAllExercises(1);
      expect(prisma.workoutsGroups.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          include: expect.anything(),
        }),
      );
    });

    it('should throw NotFoundException if not found', async () => {
      (prisma.workoutsGroups.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete group', async () => {
      const result = { id: 1 };
      // Mock findUnique for findOne check
      (prisma.workoutsGroups.findUnique as jest.Mock).mockResolvedValue(result);
      (prisma.workoutsGroups.delete as jest.Mock).mockResolvedValue(result);
      await service.remove(1);
      expect(prisma.workoutsGroups.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { WorkoutSessions: true },
      });
    });
  });
});
