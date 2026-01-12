import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClassBookingDto {
  @ApiProperty({ description: 'The ID of the personal class schedule', example: 1 })
  @IsInt()
  personalClassScheduleId: number;

  @ApiProperty({ description: 'The ID of the student', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  studentId: string;

  @ApiProperty({ description: 'The booking date of the class', example: '2025-07-20T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  bookingDate?: Date;

  @ApiProperty({ description: 'The status of the class booking', example: 'CONFIRMED', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Indicates if the class booking has been rescheduled', example: false, required: false })
  @IsOptional()
  isRescheduled?: boolean;

  @ApiProperty({ description: 'The ID of the original class booking if this is a rescheduled one', example: 1, required: false })
  @IsOptional()
  @IsInt()
  originalClassBookingId?: number;
}
