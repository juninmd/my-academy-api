import { Test, TestingModule } from '@nestjs/testing';
import { MethodsService } from './methods.service';
import { PrismaService } from '../prisma.service';

describe('MethodsService', () => {
  let service: MethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MethodsService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MethodsService>(MethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
