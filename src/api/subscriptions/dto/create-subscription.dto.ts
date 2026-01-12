import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'The ID of the user subscribing', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The start date of the subscription', example: '2025-07-20T00:00:00Z' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'The end date of the subscription', example: '2026-07-20T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ description: 'The status of the subscription (e.g., active, inactive, cancelled)', example: 'active' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'The amount paid for the subscription', example: 99.99 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The date the payment was made', example: '2025-07-20T00:00:00Z' })
  @IsDateString()
  paymentDate: Date;
}
