import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
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
  async searchBirds(@Query('q') query: string) {
    if (!query) {
      throw new BadRequestException('Se requiere un término de búsqueda');
    }

    const results = await this.birdsService.searchByAnyName(query);

    return {
      message: 'Especies encontradas exitosamente',
      data: results,
    };
  }

  @Get('endangeredspecies')
  async findAllEndangered(@Query('status') status?: string) {
    const statusCodes: string[] | undefined = status
      ? status.split(',').map(code => code.trim())
      : undefined;

    const endangeredBirds = await this.birdsService.getEndangeredSpecies(statusCodes);

    return {
      message: 'Aves en peligro obtenidas con éxito',
      data: endangeredBirds,
    };
  }


  @Get('by-status')
  async getByStatus(
    @Query('status') status: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const statusCodes = status.split(',').map(code => code.trim());
    const skip = (page - 1) * limit;

    const [species, total] = await Promise.all([
      this.birdsService.getSpeciesByStatus(statusCodes, skip, limit),
      this.birdsService.countSpeciesByStatus(statusCodes),
    ]);

    return {
      message: 'Aves filtradas por estatus',
      data: species,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  async getBirdById(@Param('id') id: string) {
    return this.birdsService.getSpeciesById(id);
  }
}
