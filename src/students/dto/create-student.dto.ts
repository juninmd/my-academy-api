import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ required: true })
  id: number;
  @ApiProperty({ required: true })
  userId: string;
  @ApiProperty({ required: true })
  personalsId: number | null;
}
