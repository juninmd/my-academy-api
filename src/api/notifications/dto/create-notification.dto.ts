import { IsBoolean, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;

  @IsString()
  message: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  readStatus?: boolean;

  @IsOptional()
  @IsInt()
  workoutSessionId?: number;
}
