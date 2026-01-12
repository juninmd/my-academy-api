import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'The ID of the user sending the notification', example: 'clx0d4d0d000008jv03712345' })
  @IsString()
  senderId: string;

  @ApiProperty({ description: 'The ID of the user receiving the notification', example: 'clx0d4d0d000008jv03712346' })
  @IsString()
  receiverId: string;

  @ApiProperty({ description: 'The content of the notification message', example: 'Your workout session is scheduled for tomorrow.' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'The type of notification (e.g., workout_reminder, class_update)', example: 'workout_reminder' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The read status of the notification', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  readStatus?: boolean;

  @ApiProperty({ description: 'The ID of the associated workout session, if any', example: 1, required: false })
  @IsOptional()
  @IsInt()
  workoutSessionId?: number;
}
