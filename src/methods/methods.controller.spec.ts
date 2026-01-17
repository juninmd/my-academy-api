import { Test, TestingModule } from '@nestjs/testing';
import { MethodsController } from './methods.controller';
import { MethodsService } from './methods.service';
import { PrismaService } from '../prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('MethodsController', () => {
  let controller: MethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MethodsController],
      providers: [
        MethodsService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MethodsController>(MethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
