import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhysicalAssessmentScheduleDto {
  @ApiProperty({ description: 'Data do agendamento (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Hora do agendamento (HH:MM)' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'ID do usuário (aluno)' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID do personal' })
  @IsNumber()
  @IsNotEmpty()
  personalId: number;

  @ApiProperty({ description: 'Status do agendamento', default: 'scheduled' })
  @IsString()
  status?: string;
}
