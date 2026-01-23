import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsService } from './workouts.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';

describe('WorkoutsService', () => {
  let service: WorkoutsService;

  const mockWorkout: Workout = {
    id: 1,
    exerciseId: 1,
    description: 'Test Workout',
    workoutsGroupsId: 1,
    methodId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    workoutSeries: [],
  };

  const prismaMock = {
    workouts: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
    workoutSeries: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createWorkoutDto: CreateWorkoutDto = {
      exerciseId: 1,
      workoutsGroupsId: 1,
      description: 'Test',
      methodId: 1,
      workoutSeries: [
        {
          repetitions: 10,
          weight: 10,
          rest: 60,
          time: 0,
          distance: 0,
          speed: 0,
        },
      ],
    };

    it('should create a workout', async () => {
      prismaMock.workouts.create.mockResolvedValue(mockWorkout);

      const result = await service.create(createWorkoutDto);

      expect(prismaMock.workouts.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          exerciseId: createWorkoutDto.exerciseId,
          workoutSeries: expect.objectContaining({
            create: expect.any(Array),
          }),
        }),
        include: { workoutSeries: true },
      });
      expect(result).toEqual(mockWorkout);
    });
  });

  describe('findAll', () => {
    it('should return an array of workouts', async () => {
      prismaMock.workouts.findMany.mockResolvedValue([mockWorkout]);

      const result = await service.findAll();

      expect(prismaMock.workouts.findMany).toHaveBeenCalledWith({
        include: { workoutSeries: true },
      });
      expect(result).toEqual([mockWorkout]);
    });
  });

  describe('findOne', () => {
    it('should return a workout if found', async () => {
      prismaMock.workouts.findUnique.mockResolvedValue(mockWorkout);

      const result = await service.findOne(1);

      expect(prismaMock.workouts.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { workoutSeries: true },
      });
      expect(result).toEqual(mockWorkout);
    });

    it('should throw NotFoundException if workout not found', async () => {
      prismaMock.workouts.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateWorkoutDto: UpdateWorkoutDto = {
      description: 'Updated',
    };

    it('should update a workout without series change', async () => {
      prismaMock.workouts.findUnique.mockResolvedValue(mockWorkout);
      prismaMock.workouts.update.mockResolvedValue({
        ...mockWorkout,
        ...updateWorkoutDto,
      });

      const result = await service.update(1, updateWorkoutDto);

      expect(prismaMock.workouts.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining(updateWorkoutDto),
        include: { workoutSeries: true },
      });
      expect(result.description).toEqual('Updated');
    });

    it('should update a workout with series change using transaction', async () => {
      const updateWithSeriesDto: UpdateWorkoutDto = {
        workoutSeries: [
          {
            repetitions: 12,
            weight: 15,
            rest: 45,
            time: 0,
            distance: 0,
            speed: 0,
          },
        ],
      };

      prismaMock.workouts.findUnique.mockResolvedValue(mockWorkout);
      prismaMock.$transaction.mockImplementation(async (callback) => {
        return await callback(prismaMock);
      });
      prismaMock.workouts.update.mockResolvedValue(mockWorkout);

      await service.update(1, updateWithSeriesDto);

      expect(prismaMock.$transaction).toHaveBeenCalled();
      // Inside transaction checks are implicit if transaction mock executes callback
      expect(prismaMock.workoutSeries.deleteMany).toHaveBeenCalledWith({
        where: { workoutId: 1 },
      });
    });
  });

  describe('remove', () => {
    it('should remove a workout', async () => {
      prismaMock.workouts.findUnique.mockResolvedValue(mockWorkout);
      prismaMock.workouts.delete.mockResolvedValue(mockWorkout);

      const result = await service.remove(1);

      expect(prismaMock.workouts.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { workoutSeries: true },
      });
      expect(result).toEqual(mockWorkout);
    });
  });
});
