import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $connect = jest.fn();
    },
  };
});

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect on module init', async () => {
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalled();
  });

  it('should enable shutdown hooks', async () => {
    const app = {
      close: jest.fn(),
    };
    await service.enableShutdownHooks(app as any);
    expect(app.close).toHaveBeenCalled();
  });

  it('should throw an error if DATABASE_URL is not set', () => {
    const originalUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    expect(() => new PrismaService()).toThrow('DATABASE_URL is not set');

    process.env.DATABASE_URL = originalUrl;
  });

  it('should call destroy method', async () => {
    service.$disconnect = jest.fn();
    (service as any).pool = { end: jest.fn() };
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalled();
    expect((service as any).pool.end).toHaveBeenCalled();
  });
});
