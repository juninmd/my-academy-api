import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({ required: true })
  id?: number;
  @ApiProperty({ required: true })
  userId?: string;
  @ApiProperty({ required: true })
  personalsId?: number | null;
}
