import { ApiProperty } from '@nestjs/swagger';

export class CreateMethodDto {
  @ApiProperty({ description: 'The name of the method', example: 'FST-7' })
  name: string;

  @ApiProperty({ description: 'A description of the method', example: 'Fascia Stretch Training-7 is a training protocol involving 7 sets of 10-15 reps with short rest periods.' })
  description: string;
}
