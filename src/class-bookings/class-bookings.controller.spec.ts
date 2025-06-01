import { Test, TestingModule } from '@nestjs/testing';
import { ClassBookingsController } from './class-bookings.controller';

describe('ClassBookingsController', () => {
  let controller: ClassBookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassBookingsController],
    }).compile();

    controller = module.get<ClassBookingsController>(ClassBookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
