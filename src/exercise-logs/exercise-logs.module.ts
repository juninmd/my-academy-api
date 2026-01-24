import { Module } from '@nestjs/common';
import { ExerciseLogsService } from './exercise-logs.service';
import { ExerciseLogsController } from './exercise-logs.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [ExerciseLogsController],
    providers: [ExerciseLogsService, PrismaService],
})
export class ExerciseLogsModule { }
