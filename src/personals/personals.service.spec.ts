import { Test, TestingModule } from '@nestjs/testing';
import { PersonalsService } from './personals.service';
import { PrismaService } from '../prisma.service';

describe('PersonalsService', () => {
  let service: PersonalsService;
  let prisma: PrismaService;

  const mockPrisma = {
    personals: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonalsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<PersonalsService>(PersonalsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create personal relation', async () => {
      const dto = { studentUserId: 's1', personalUserId: 'p1' };
      const result = { id: 1, ...dto };
      (prisma.personals.create as jest.Mock).mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
      expect(prisma.personals.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return personals with relations', async () => {
      const result = [{ id: 1 }];
      (prisma.personals.findMany as jest.Mock).mockResolvedValue(result);

      expect(await service.findAll('p1')).toBe(result);
      expect(prisma.personals.findMany).toHaveBeenCalledWith({
        where: { personalUserId: 'p1' },
        include: { PersonalUser: true, StudentUser: true },
      });
    });
  });

  describe('findStudents', () => {
    it('should return students and schedule flattened', async () => {
      const dbResult = [
        {
          StudentUser: { id: 's1' },
          PersonalClassSchedule: { id: 'sch1' },
        },
      ];
      const expected = [{ student: { id: 's1' }, schedule: { id: 'sch1' } }];

      (prisma.personals.findMany as jest.Mock).mockResolvedValue(dbResult);

      expect(await service.findStudents('p1')).toEqual(expected);
      expect(prisma.personals.findMany).toHaveBeenCalledWith({
        where: { personalUserId: 'p1' },
        include: { StudentUser: true, PersonalClassSchedule: true },
      });
    });
  });

  describe('update', () => {
    it('should update personal relation', async () => {
      const dto = { id: 1, active: true };
      const result = { id: 1, active: true };

      (prisma.personals.update as jest.Mock).mockResolvedValue(result);

      expect(await service.update(1, dto as any)).toBe(result);
      expect(prisma.personals.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { active: true },
      });
    });
  });

  describe('remove', () => {
    it('should delete personal relation', async () => {
      const result = { id: 1 };
      (prisma.personals.delete as jest.Mock).mockResolvedValue(result);

      expect(await service.remove(1)).toBe(result);
      expect(prisma.personals.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
