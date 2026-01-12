import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhysicalAssessmentScheduleDto {
  @ApiProperty({ description: 'The date of the physical assessment schedule (YYYY-MM-DD)', example: '2025-07-20' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'The time of the physical assessment schedule (HH:MM)', example: '10:00' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'The ID of the user (student)', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the personal trainer', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  personalId: number;

  @ApiProperty({ description: 'The status of the physical assessment schedule', example: 'scheduled', default: 'scheduled' })
  @IsString()
  status?: string;
}
