import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateStudentAcademyDto {
  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsNumber()
  academyId: number;
}
