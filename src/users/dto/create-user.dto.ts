import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsUrl()
  photoUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telegramId?: string;
}
