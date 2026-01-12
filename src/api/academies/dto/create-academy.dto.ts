import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAcademyDto {
  @ApiProperty({ description: 'The name of the academy', example: 'My Academy' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the academy', example: '123 Main St, Anytown USA', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'The ID of the academy owner (user)', example: 'clx0d4d0d000008jv03712345', required: false })
  @IsOptional()
  @IsString()
  ownerId?: string;
}
