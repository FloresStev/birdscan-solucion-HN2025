import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaturalreservesService } from './naturalreserves.service';
import { CreateNaturalreserveDto } from './dto/create-naturalreserve.dto';
import { UpdateNaturalreserveDto } from './dto/update-naturalreserve.dto';

@Controller('naturalreserves')
export class NaturalreservesController {
  constructor(private readonly naturalreservesService: NaturalreservesService) {}

  @Post()
  create(@Body() createNaturalreserveDto: CreateNaturalreserveDto) {
    return this.naturalreservesService.create(createNaturalreserveDto);
  }

  @Get()
  findAll() {
    return this.naturalreservesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.naturalreservesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaturalreserveDto: UpdateNaturalreserveDto) {
    return this.naturalreservesService.update(+id, updateNaturalreserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.naturalreservesService.remove(+id);
  }
}
