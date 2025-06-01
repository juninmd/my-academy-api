import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutDto } from '../../workouts/dto/create-workout.dto';

export class CreateWorkoutsGroupDto {
  @ApiProperty({ required: true, description: 'Treino' })
  name: string;

  @ApiProperty({ required: true })
  image: string;

  @ApiProperty({ required: false })
  observations?: string;

  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: false })
  personalId?: number; // Adicionado para consistência com o schema

  @ApiProperty({ required: false, type: [CreateWorkoutDto] })
  workouts?: CreateWorkoutDto[];
}
