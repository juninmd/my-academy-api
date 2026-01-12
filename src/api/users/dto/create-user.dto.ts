import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The unique ID of the user', example: 'clx0d4d0d000008jv03712345' })
  id: string;

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'The email address of the user', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: "The URL of the user's profile photo", example: 'https://example.com/photo.jpg' })
  photoUrl: string;

  @ApiProperty({ description: 'The Telegram ID of the user', example: '123456789', required: false })
  telegramId?: string;

  @ApiProperty({ description: 'The role of the user', example: 'STUDENT', required: false })
  role?: string;
}
