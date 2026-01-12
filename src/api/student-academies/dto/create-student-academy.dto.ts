import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateStudentAcademyDto {
  @ApiProperty({ description: 'The ID of the student', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  studentId: string;

  @ApiProperty({ description: 'The ID of the academy', example: 1 })
  @IsNumber()
  academyId: number;
}
