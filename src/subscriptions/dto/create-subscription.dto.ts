import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  userId: string;

  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsString()
  status: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  paymentDate: Date;
}
