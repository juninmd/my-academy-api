import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ required: true })
  id: number;
  @ApiProperty({ required: true })
  userId: number;
  @ApiProperty({ required: true })
  personalsId: number | null;
}
