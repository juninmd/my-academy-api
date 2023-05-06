import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalsService } from './personals.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Controller('personals')
export class PersonalsController {
  constructor(private readonly personalsService: PersonalsService) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalsService.create(createPersonalDto);
  }

  @Get()
  findAll() {
    return this.personalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
    return this.personalsService.update(+id, updatePersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalsService.remove(+id);
  }
}
