import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';

@Controller('birds')
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) { }

  @Get('all')
  async findAll() {
    const birds = await this.birdsService.findAll();
    return {
      message: 'Aves obtenidas con éxito',
      data: birds,
    };
  }

  @Get('search')
  async findOne(@Query('scientificName') scientificName?: string, @Query('spanish_commonName') spanish_commonName?: string, @Query('english_commonName') english_commonName?: string) {

    return this.birdsService.getSpecieByName(
      scientificName,
      english_commonName,
      spanish_commonName,
    );
  }

  @Get('endangeredspecies')
  async findAllEndangered(){
    const endangeredBirds = await this.birdsService.getEndangeredSpecies();
    return {
      message: 'Aves en peligro obtenidas con éxito',
      data: endangeredBirds,
    }
  }

}
