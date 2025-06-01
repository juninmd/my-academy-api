import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePhysicalAssessmentDto {
  @IsString()
  userId: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  bodyFatPercentage?: number;

  @IsOptional()
  @IsNumber()
  muscleMassPercentage?: number;

  @IsOptional()
  @IsString()
  observations?: string;
}
