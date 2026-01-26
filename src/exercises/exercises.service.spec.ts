import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ExerciseType } from '@prisma/client';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let prisma: PrismaService;

  const mockPrisma = {
    exercises: {
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
        ExercisesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an exercise', async () => {
      const dto = {
        name: 'Push up',
        image: 'img',
        tips: 'tip',
        mistakes: 'mistake',
        type: ExerciseType.STRENGTH,
      };
      const result = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.exercises.create as jest.Mock).mockResolvedValue(result);
      expect(await service.create(dto)).toBe(result);
      expect(prisma.exercises.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return array of exercises', async () => {
      const result = [{ id: 1 }];
      (prisma.exercises.findMany as jest.Mock).mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an exercise', async () => {
      const result = { id: 1 };
      (prisma.exercises.findUnique as jest.Mock).mockResolvedValue(result);
      expect(await service.findOne(1)).toBe(result);
      expect(prisma.exercises.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException', async () => {
      (prisma.exercises.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an exercise', async () => {
      const dto = { name: 'Updated' };
      const result = { id: 1, name: 'Updated' };

      (prisma.exercises.findUnique as jest.Mock).mockResolvedValue(result); // for findOne check
      (prisma.exercises.update as jest.Mock).mockResolvedValue(result);

      expect(await service.update(1, dto as any)).toBe(result);
      expect(prisma.exercises.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining(dto),
      });
    });
  });

  describe('remove', () => {
    it('should delete an exercise', async () => {
      const result = { id: 1 };
      (prisma.exercises.findUnique as jest.Mock).mockResolvedValue(result); // for findOne check
      (prisma.exercises.delete as jest.Mock).mockResolvedValue(result);

      expect(await service.remove(1)).toBe(result);
      expect(prisma.exercises.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
