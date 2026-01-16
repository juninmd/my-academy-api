import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ExerciseType } from '@prisma/client';

export class CreateExerciseDto {
  @ApiProperty({ required: true, description: 'Nome do treino' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true, description: 'Imagem ilustrativa' })
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ required: true, description: 'Dicas de execução' })
  @IsString()
  @IsNotEmpty()
  readonly tips: string;

  @ApiProperty({ required: true, description: 'Erros comuns' })
  @IsString()
  @IsNotEmpty()
  readonly mistakes: string;

  @ApiProperty({ required: false, enum: ExerciseType, description: 'Tipo de exercício' })
  @IsOptional()
  @IsEnum(ExerciseType)
  readonly type?: ExerciseType;
}
