import { Test, TestingModule } from '@nestjs/testing';
import { MethodsService } from './methods.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('MethodsService', () => {
  let service: MethodsService;
  let prisma: PrismaService;

  const mockPrisma = {
    methods: {
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
        MethodsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<MethodsService>(MethodsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a method', async () => {
      const dto = { name: 'Method 1', description: 'Desc' };
      const result = { id: 1, ...dto };
      (prisma.methods.create as jest.Mock).mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
      expect(prisma.methods.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return array of methods', async () => {
      const result = [{ id: 1 }];
      (prisma.methods.findMany as jest.Mock).mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a method', async () => {
      const result = { id: 1 };
      (prisma.methods.findUnique as jest.Mock).mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
      expect(prisma.methods.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException', async () => {
      (prisma.methods.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a method', async () => {
      const dto = { name: 'Updated' };
      const result = { id: 1, ...dto };

      (prisma.methods.findUnique as jest.Mock).mockResolvedValue(result);
      (prisma.methods.update as jest.Mock).mockResolvedValue(result);

      expect(await service.update(1, dto as any)).toBe(result);
      expect(prisma.methods.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining(dto),
      });
    });
  });

  describe('remove', () => {
    it('should remove a method', async () => {
      const result = { id: 1 };
      (prisma.methods.findUnique as jest.Mock).mockResolvedValue(result);
      (prisma.methods.delete as jest.Mock).mockResolvedValue(result);

      expect(await service.remove(1)).toBe(result);
      expect(prisma.methods.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
