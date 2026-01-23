import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSeriesService } from './workouts-series.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateWorkoutsSeriesDto } from './dto/create-workouts-series.dto';
import { UpdateWorkoutsSeriesDto } from './dto/update-workouts-series.dto';
import { WorkoutSeries } from './entities/workout-series.entity';

describe('WorkoutsSeriesService', () => {
  let service: WorkoutsSeriesService;
  let prismaService: PrismaService;

  const mockSeries: WorkoutSeries = {
    id: 1,
    workoutId: 1,
    repetitions: 10,
    weight: 20,
    rest: 60,
    time: null,
    distance: null,
    speed: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const prismaMock = {
    workoutSeries: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsSeriesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<WorkoutsSeriesService>(WorkoutsSeriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a workout series', async () => {
      const dto: CreateWorkoutsSeriesDto = {
        workoutId: 1,
        repetitions: 10,
        weight: 20,
        rest: 60,
        time: 0,
        distance: 0,
        speed: 0,
      };
      prismaMock.workoutSeries.create.mockResolvedValue(mockSeries);

      const result = await service.create(dto);

      expect(prismaMock.workoutSeries.create).toHaveBeenCalledWith({
        data: dto,
      });
      expect(result).toEqual(mockSeries);
    });

    it('should throw BadRequestException if workoutId is missing', async () => {
      const dto: CreateWorkoutsSeriesDto = {
        repetitions: 10,
        weight: 20,
        rest: 60,
        time: 0,
        distance: 0,
        speed: 0,
      } as any;

      try {
        await service.create(dto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findAll', () => {
    it('should return all series', async () => {
      prismaMock.workoutSeries.findMany.mockResolvedValue([mockSeries]);

      const result = await service.findAll();

      expect(prismaMock.workoutSeries.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockSeries]);
    });
  });

  describe('findOne', () => {
    it('should return a series if found', async () => {
      prismaMock.workoutSeries.findUnique.mockResolvedValue(mockSeries);

      const result = await service.findOne(1);

      expect(prismaMock.workoutSeries.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockSeries);
    });

    it('should throw NotFoundException if not found', async () => {
      prismaMock.workoutSeries.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a series', async () => {
      const dto: UpdateWorkoutsSeriesDto = { repetitions: 15 };
      prismaMock.workoutSeries.findUnique.mockResolvedValue(mockSeries);
      prismaMock.workoutSeries.update.mockResolvedValue({
        ...mockSeries,
        ...dto,
      });

      const result = await service.update(1, dto);

      expect(prismaMock.workoutSeries.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(result.repetitions).toBe(15);
    });
  });

  describe('remove', () => {
    it('should remove a series', async () => {
      prismaMock.workoutSeries.findUnique.mockResolvedValue(mockSeries);
      prismaMock.workoutSeries.delete.mockResolvedValue(mockSeries);

      const result = await service.remove(1);

      expect(prismaMock.workoutSeries.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockSeries);
    });
  });
});
