import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';

@Controller('birds')
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) { }

  @Get('all')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const skip = (page - 1) * limit;
    const birds = await this.birdsService.findMany({ skip, take: limit });
    const total = await this.birdsService.count();

    return {
      message: 'Aves obtenidas con éxito',
      data: birds,
      total,
      page,
      totalPages: Math.ceil(total / limit),

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
