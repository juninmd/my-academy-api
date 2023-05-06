import { Injectable } from '@nestjs/common';
import { CreateWorkoutsGroupDto } from './dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './dto/update-workouts-group.dto';

@Injectable()
export class WorkoutsGroupsService {
  create(createWorkoutsGroupDto: CreateWorkoutsGroupDto) {
    return 'This action adds a new workoutsGroup';
  }

  findAll() {
    return `This action returns all workoutsGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutsGroup`;
  }

  update(id: number, updateWorkoutsGroupDto: UpdateWorkoutsGroupDto) {
    return `This action updates a #${id} workoutsGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutsGroup`;
  }
}
