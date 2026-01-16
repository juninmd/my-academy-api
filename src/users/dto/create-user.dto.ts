import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'auth0|123456',
    description: 'User ID from Auth provider',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    required: true,
    example: 'John Doe',
    description: 'User full name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'john@example.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: 'https://example.com/photo.jpg',
    description: 'User profile photo URL',
  })
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @ApiProperty({
    required: false,
    example: '123456789',
    description: 'Telegram Chat ID',
  })
  @IsOptional()
  @IsString()
  telegramId?: string;
}
