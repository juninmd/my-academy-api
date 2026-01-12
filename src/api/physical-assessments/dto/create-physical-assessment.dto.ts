import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePhysicalAssessmentDto {
  @ApiProperty({ description: 'The ID of the user (student) for whom the assessment is being created', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The date of the physical assessment', example: '2025-07-20T10:00:00Z' })
  @IsDateString()
  date: Date;

  @ApiProperty({ description: 'The weight of the user in kilograms', example: 75.5, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'The height of the user in meters', example: 1.75, required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ description: 'The body fat percentage of the user', example: 15.2, required: false })
  @IsOptional()
  @IsNumber()
  bodyFatPercentage?: number;

  @ApiProperty({ description: 'The muscle mass percentage of the user', example: 45.1, required: false })
  @IsOptional()
  @IsNumber()
  muscleMassPercentage?: number;

  @ApiProperty({ description: 'Any additional observations or notes about the assessment', example: 'Good progress, focus on hydration.', required: false })
  @IsOptional()
  @IsString()
  observations?: string;
}
