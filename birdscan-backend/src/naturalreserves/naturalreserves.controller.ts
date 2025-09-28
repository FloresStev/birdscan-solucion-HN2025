import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { NaturalreservesService } from './naturalreserves.service';
import { CreateNaturalreserveDto } from './dto/create-naturalreserve.dto';
import { UpdateNaturalreserveDto } from './dto/update-naturalreserve.dto';

@Controller('naturalreserves')
export class NaturalreservesController {
  constructor(private readonly naturalreservesService: NaturalreservesService) { }



  @Get('all')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const skip = (page - 1) * limit;
    const reserves = await this.naturalreservesService.findMany({ skip, take: limit });
    const total = await this.naturalreservesService.count();

    return {
      message: 'Reservas obtenidas con éxito',
      data: reserves,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('search')
  async searchReserves(@Query('q') query: string) {
    if (!query) {
      throw new BadRequestException('Se requiere un término de búsqueda');
    }

    const results = await this.naturalreservesService.searchByName(query);

    return {
      message: 'Reservas encontradas exitosamente',
      data: results,
    }
  }

  @Get('by-type')
  async getByType(
    @Query('type') protected_area_type: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const typeReserves = protected_area_type.trim();
    const skip = (page - 1) * limit;

    const [reserves, total] = await Promise.all([
      this.naturalreservesService.getReservesByType(typeReserves, skip, limit),
      this.naturalreservesService.countReservesByTOM(typeReserves),
    ]);

    return {
      message: 'Reserves filtered by type',
      data: reserves,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('by-municipality')
  async getReservesByMunicipality(
    @Query('municipality') municipality: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const skip = (page - 1) * limit;
    const municipalityName = municipality.trim();

    const [reserves, total] = await Promise.all([
      this.naturalreservesService.getReservesByMunicipality(municipality, skip, limit),
      this.naturalreservesService.countReservesByTOM(municipalityName),
    ]);

    return {
      message: 'Reserves filtered by municipality',
      data: reserves,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('municipalities')
  async getMunicipalities() {
    return this.naturalreservesService.getMunicipalities();
  }

  @Get('types')
  async getTypes() {
    return this.naturalreservesService.getTypes();
  }

  @Get(':id')
  async getReserveById(@Param('id') id: string) {
    return this.naturalreservesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaturalreserveDto: UpdateNaturalreserveDto) {
    return this.naturalreservesService.update(+id, updateNaturalreserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.naturalreservesService.remove(+id);
  }

  @Get(':id/species')
  async getSpecies(@Param('id') id: string) {
    const records = await this.naturalreservesService.getSpeciesByReserve(id);

    return records.map((entry) => ({
      id: entry.species.id,
      spanish_commonName: entry.species.spanish_commonName,
      scientificName: entry.species.scientificName,
      imageUrl: entry.species.imageUrl,
      abundance: entry.abundance,
      seasonality: entry.seasonality,
      presenceLevel: entry.presenceLevel,
    }));
  }

}
