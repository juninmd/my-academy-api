import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExerciseType } from '@prisma/client';

export class CreateExerciseDto {
  @ApiProperty({ required: true, description: 'Treino' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true, description: 'Treino' })
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ required: true, description: 'Treino' })
  @IsString()
  @IsNotEmpty()
  readonly tips: string;

  @ApiProperty({ required: true, description: 'Treino' })
  @IsString()
  @IsNotEmpty()
  readonly mistakes: string;

  @ApiProperty({
    required: false,
    enum: ExerciseType,
    default: ExerciseType.STRENGTH,
  })
  @IsEnum(ExerciseType)
  @IsOptional()
  readonly type?: ExerciseType;
}
