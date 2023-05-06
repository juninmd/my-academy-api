import { Injectable } from '@nestjs/common';
import { CreateWorkoutsHistoryDto } from './dto/create-workouts-history.dto';
import { UpdateWorkoutsHistoryDto } from './dto/update-workouts-history.dto';

@Injectable()
export class WorkoutsHistoryService {
  create(createWorkoutsHistoryDto: CreateWorkoutsHistoryDto) {
    return 'This action adds a new workoutsHistory';
  }

  findAll() {
    return `This action returns all workoutsHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutsHistory`;
  }

  update(id: number, updateWorkoutsHistoryDto: UpdateWorkoutsHistoryDto) {
    return `This action updates a #${id} workoutsHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutsHistory`;
  }
}
