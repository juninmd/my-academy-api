import { Module } from '@nestjs/common';
import { ClassBookingsController } from './class-bookings.controller';
import { ClassBookingsService } from './class-bookings.service';

@Module({
  controllers: [ClassBookingsController],
  providers: [ClassBookingsService]
})
export class ClassBookingsModule {}
