import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNaturalreserveDto } from './dto/create-naturalreserve.dto';
import { UpdateNaturalreserveDto } from './dto/update-naturalreserve.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Reserve } from '@prisma/client';

@Injectable()
export class NaturalreservesService {

  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async findAll() {
    try {
      const cached = await this.cacheManager.get<Reserve[]>('reserves:all')
      if (cached) return cached;

      const reserves = await this.prisma.reserve.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          department: true,
          municipality: true,
          area: true,
          latitude: true,
          longitude: true,
          activities: true,
          protected_area_type: true,
          images: true,
          entrance_fee: true,
          opening_hours: true,
          services: true,
          attraction: true,
          site: true,
          phone: true,
          email: true,
        },
      });

      await this.cacheManager.set('reserves:all', reserves, 3600);

      return reserves;
    } catch (error) {

    }
  }

  async findMany({ skip, take }: { skip: number; take: number }) {

    const pageKey = `reserves:page:${skip}:${take}`
    const cached = await this.cacheManager.get<Reserve[]>(pageKey);
    if (cached) return cached;

    try {
      const reserves = await this.prisma.reserve.findMany({
        skip,
        take,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          description: true,
          department: true,
          municipality: true,
          area: true,
          latitude: true,
          longitude: true,
          activities: true,
          protected_area_type: true,
          images: true,
          entrance_fee: true,
          opening_hours: true,
          services: true,
          attraction: true,
          site: true,
          phone: true,
          email: true,
        },
      });
      await this.cacheManager.set(pageKey, reserves, 1800);
      return reserves;
    } catch (error) {
      console.error('Error fetching paginated natural reserves:', error);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async count() {
    try {
      return await this.prisma.reserve.count();
    } catch (error) {
      console.error('Error counting natural reserves:', error);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async searchByName(name: string) {
    try {
      return this.prisma.reserve.findMany({
        where: { name },
        select: {
          id: true,
          name: true,
          description: true,
          department: true,
          municipality: true,
          area: true,
          latitude: true,
          longitude: true,
          activities: true,
          protected_area_type: true,
          images: true,
          entrance_fee: true,
          opening_hours: true,
          services: true,
          attraction: true,
          site: true,
          phone: true,
          email: true,
        },
      });
    } catch (error) {
      console.error('Error searching natural reserves by name:', error);
      throw new Error('No se pudo realizar la búsqueda de reservas naturales');
    }

  }

  async getReservesByType(protected_area_type: string, skip: number, take: number) {
    return await this.prisma.reserve.findMany({
      where: { protected_area_type },
      skip,
      take,
      select: {
        id: true,
        name: true,
        description: true,
        department: true,
        municipality: true,
        area: true,
        latitude: true,
        longitude: true,
        activities: true,
        protected_area_type: true,
        images: true,
        entrance_fee: true,
        opening_hours: true,
        services: true,
        attraction: true,
        site: true,
        phone: true,
        email: true,
      }
    })
  }

  async countReservesByTOM(protected_area_type?: string, municipality?: string) {
    const where: any = {};
    if (protected_area_type) where.protected_area_type = protected_area_type;
    if (municipality) where.municipality = municipality;

    return await this.prisma.reserve.count({ where });
  }

  async getReservesByMunicipality(municipality: string, skip: number, take: number) {
    return await this.prisma.reserve.findMany({
      where: { municipality },
      skip,
      take,
      select: {
        id: true,
        name: true,
        description: true,
        department: true,
        municipality: true,
        area: true,
        latitude: true,
        longitude: true,
        activities: true,
        protected_area_type: true,
        images: true,
        entrance_fee: true,
        opening_hours: true,
        services: true,
        attraction: true,
        site: true,
        phone: true,
        email: true,
      }
    })
  }

  async getMunicipalities(): Promise<string[]> {
    const municipalities = await this.prisma.reserve.findMany({
      distinct: ['municipality'],
      select: { municipality: true },
    });

    return municipalities
      .map(m => m.municipality)
      .filter(m => typeof m === 'string')
      .sort((a, b) => a.localeCompare(b));
  }

  async getTypes(): Promise<string[]> {
    const types = await this.prisma.reserve.findMany({
      distinct: ['protected_area_type'],
      select: { protected_area_type: true },
    });

    return types
      .map(t => t.protected_area_type)
      .filter((t): t is string => typeof t === 'string')
      .sort((a, b) => a.localeCompare(b));
  }

  async findById(id: string) {
    return await this.prisma.reserve.findUnique({
      where: { id },
    });
  }

  async getSpeciesByReserve(reserveId: string) {
    return await this.prisma.reserveSpecies.findMany({
      where: { reserveId },
      include: {
        species: true,
      },
    });
  }

  update(id: number, updateNaturalreserveDto: UpdateNaturalreserveDto) {
    return `This action updates a #${id} naturalreserve`;
  }

  remove(id: number) {
    return `This action removes a #${id} naturalreserve`;
  }
}
