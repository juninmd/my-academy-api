import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';
import { ExerciseLogsService } from './exercise-logs.service';

@ApiTags('Exercise Logs')
@Controller('exercise-logs')
export class ExerciseLogsController {
    constructor(private readonly exerciseLogsService: ExerciseLogsService) { }

    @Post()
    create(@Body() createExerciseLogDto: CreateExerciseLogDto) {
        return this.exerciseLogsService.create(createExerciseLogDto);
    }

    @Get()
    findAll(
        @Query('userId') userId: string,
        @Query('exerciseId') exerciseId?: string,
    ) {
        // Handle json-server style or generic params
        return this.exerciseLogsService.findAll(
            userId,
            exerciseId ? +exerciseId : undefined,
        );
    }
}
