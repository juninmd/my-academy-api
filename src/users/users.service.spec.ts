import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: User = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    photoUrl: 'http://example.com/photo.jpg',
    telegramId: '123456789',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'STUDENT',
  } as any; // Using any to bypass unused properties for now

  const prismaMock = {
    users: {
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
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      photoUrl: 'http://example.com/photo.jpg',
      telegramId: '123456789',
    };

    it('should create a user if not exists', async () => {
      prismaMock.users.findUnique.mockResolvedValue(null);
      prismaMock.users.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(prismaMock.users.findUnique).toHaveBeenCalledWith({
        where: { id: createUserDto.id },
      });
      expect(prismaMock.users.create).toHaveBeenCalledWith({
        data: {
          id: createUserDto.id,
          name: createUserDto.name,
          email: createUserDto.email,
          photoUrl: createUserDto.photoUrl,
          telegramId: createUserDto.telegramId,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw ConflictException if user already exists', async () => {
      prismaMock.users.findUnique.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(prismaMock.users.findUnique).toHaveBeenCalledWith({
        where: { id: createUserDto.id },
      });
      expect(prismaMock.users.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      prismaMock.users.findMany.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(prismaMock.users.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      prismaMock.users.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne('123');

      expect(prismaMock.users.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      prismaMock.users.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      expect(prismaMock.users.findUnique).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });

  describe('update', () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };

    it('should update a user if found', async () => {
      prismaMock.users.update.mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });

      const result = await service.update('123', updateUserDto);

      expect(prismaMock.users.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: expect.objectContaining(updateUserDto),
      });
      expect(result.name).toEqual(updateUserDto.name);
    });

    it('should throw NotFoundException if user to update not found', async () => {
      const error = new Error('Record to update not found.');
      (error as any).code = 'P2025';
      prismaMock.users.update.mockRejectedValue(error);

      await expect(service.update('999', updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.users.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user if found', async () => {
      prismaMock.users.delete.mockResolvedValue(mockUser);

      const result = await service.remove('123');

      expect(prismaMock.users.delete).toHaveBeenCalledWith({
        where: { id: '123' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user to remove not found', async () => {
      const error = new Error('Record to delete not found.');
      (error as any).code = 'P2025';
      prismaMock.users.delete.mockRejectedValue(error);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
      expect(prismaMock.users.delete).toHaveBeenCalled();
    });
  });
});
