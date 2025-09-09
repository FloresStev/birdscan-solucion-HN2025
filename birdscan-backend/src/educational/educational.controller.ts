import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationalService } from './educational.service';
import { CreateEducationalDto } from './dto/create-educational.dto';
import { UpdateEducationalDto } from './dto/update-educational.dto';

@Controller('educational')
export class EducationalController {
  constructor(private readonly educationalService: EducationalService) {}

  @Post()
  create(@Body() createEducationalDto: CreateEducationalDto) {
    return this.educationalService.create(createEducationalDto);
  }

  @Get()
  findAll() {
    return this.educationalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationalDto: UpdateEducationalDto) {
    return this.educationalService.update(+id, updateEducationalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalService.remove(+id);
  }
}
