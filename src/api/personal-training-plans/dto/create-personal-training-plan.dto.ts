import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePersonalTrainingPlanDto {
  @ApiProperty({ description: 'The ID of the user (student)', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the personal trainer', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  personalId: number;

  @ApiProperty({ description: 'The start date of the plan (YYYY-MM-DD)', example: '2025-07-20' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'The end date of the plan (YYYY-MM-DD)', example: '2025-12-20', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ description: 'Number of sessions per week', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  sessionsPerWeek: number;

  @ApiProperty({ description: 'Price per session', example: 50.00, required: false })
  @IsNumber()
  @IsOptional()
  pricePerSession?: number;

  @ApiProperty({ description: 'Billing type (included, separate)', example: 'separate', default: 'separate', required: false })
  @IsString()
  @IsOptional()
  billingType?: string;

  @ApiProperty({ description: 'Status of the plan', example: 'active', default: 'active', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
