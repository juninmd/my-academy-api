import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePersonalTrainingPlanDto {
  @ApiProperty({ description: 'ID do usuário (aluno)' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID do personal' })
  @IsNumber()
  @IsNotEmpty()
  personalId: number;

  @ApiProperty({ description: 'Data de início do plano (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'Data de término do plano (YYYY-MM-DD)', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ description: 'Número de sessões por semana' })
  @IsNumber()
  @IsNotEmpty()
  sessionsPerWeek: number;

  @ApiProperty({ description: 'Preço por sessão', required: false })
  @IsNumber()
  @IsOptional()
  pricePerSession?: number;

  @ApiProperty({ description: 'Tipo de cobrança (included, separate)', default: 'separate', required: false })
  @IsString()
  @IsOptional()
  billingType?: string;

  @ApiProperty({ description: 'Status do plano', default: 'active', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
