import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClassBookingDto {
  @IsInt()
  personalClassScheduleId: number;

  @IsString()
  studentId: string;

  @IsOptional()
  @IsDateString()
  bookingDate?: Date;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  isRescheduled?: boolean;

  @IsOptional()
  @IsInt()
  originalClassBookingId?: number;
}
