import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ExerciseType } from '@prisma/client';

export class CreateExerciseDto {
  @ApiProperty({
    required: true,
    description: 'Name of the exercise',
    example: 'Bench Press',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    required: true,
    description: 'Illustrative image URL',
    example: 'https://example.com/bench_press.jpg',
  })
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({
    required: true,
    description: 'Execution tips',
    example: 'Keep your back flat.',
  })
  @IsString()
  @IsNotEmpty()
  readonly tips: string;

  @ApiProperty({
    required: true,
    description: 'Common mistakes',
    example: 'Arching your back too much.',
  })
  @IsString()
  @IsNotEmpty()
  readonly mistakes: string;

  @ApiProperty({
    required: false,
    enum: ExerciseType,
    description: 'Type of exercise (STRENGTH, CARDIO)',
    example: 'STRENGTH',
  })
  @IsOptional()
  @IsEnum(ExerciseType)
  readonly type?: ExerciseType;
}
