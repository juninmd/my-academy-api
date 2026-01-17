import { Test, TestingModule } from '@nestjs/testing';
import { PersonalsController } from './personals.controller';
import { PersonalsService } from './personals.service';
import { PrismaService } from '../prisma.service';

describe('PersonalsController', () => {
  let controller: PersonalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalsController],
      providers: [
        PersonalsService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PersonalsController>(PersonalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
