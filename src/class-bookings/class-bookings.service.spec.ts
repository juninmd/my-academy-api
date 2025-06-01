import { Test, TestingModule } from '@nestjs/testing';
import { ClassBookingsService } from './class-bookings.service';

describe('ClassBookingsService', () => {
  let service: ClassBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassBookingsService],
    }).compile();

    service = module.get<ClassBookingsService>(ClassBookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
