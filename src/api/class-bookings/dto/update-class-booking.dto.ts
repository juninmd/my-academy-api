import { PartialType } from '@nestjs/mapped-types';
import { CreateClassBookingDto } from './create-class-booking.dto';

export class UpdateClassBookingDto extends PartialType(CreateClassBookingDto) {}
