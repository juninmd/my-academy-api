import { Test, TestingModule } from '@nestjs/testing';
import { PersonalsController } from './personals.controller';
import { PersonalsService } from './personals.service';

describe('PersonalsController', () => {
  let controller: PersonalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalsController],
      providers: [PersonalsService],
    }).compile();

    controller = module.get<PersonalsController>(PersonalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
