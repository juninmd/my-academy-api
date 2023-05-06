import { Injectable } from '@nestjs/common';
import { CreateWorkoutsCategoryDto } from './dto/create-workouts-category.dto';
import { UpdateWorkoutsCategoryDto } from './dto/update-workouts-category.dto';

@Injectable()
export class WorkoutsCategoriesService {
  create(createWorkoutsCategoryDto: CreateWorkoutsCategoryDto) {
    return 'This action adds a new workoutsCategory';
  }

  findAll() {
    return `This action returns all workoutsCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutsCategory`;
  }

  update(id: number, updateWorkoutsCategoryDto: UpdateWorkoutsCategoryDto) {
    return `This action updates a #${id} workoutsCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutsCategory`;
  }
}
