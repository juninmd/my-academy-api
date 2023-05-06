import { Injectable } from '@nestjs/common';
import { CreateExercisesSeryDto } from './dto/create-exercises-sery.dto';
import { UpdateExercisesSeryDto } from './dto/update-exercises-sery.dto';

@Injectable()
export class ExercisesSeriesService {
  create(createExercisesSeryDto: CreateExercisesSeryDto) {
    return 'This action adds a new exercisesSery';
  }

  findAll() {
    return `This action returns all exercisesSeries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercisesSery`;
  }

  update(id: number, updateExercisesSeryDto: UpdateExercisesSeryDto) {
    return `This action updates a #${id} exercisesSery`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercisesSery`;
  }
}
