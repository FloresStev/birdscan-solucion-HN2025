import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { Bird } from './entities/bird.entity';
import type { Cache } from 'cache-manager';


@Injectable()
export class BirdsService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }


  async findAll() {
    try {

      const cached = await this.cacheManager.get<Bird[]>('birds:all');
      if (cached) return cached;

      const birds = await this.prisma.species.findMany({
        select: {
          id: true,
          spanish_commonName: true,
          english_commonName: true,
          scientificName: true,
          conservationStatus: true,
          status: true,
          description: true,
          imageUrl: true,
          distribution: true,
        },
      });

      await this.cacheManager.set('birds:all', birds, 3600);

      return birds;
    } catch (error) {
      console.error('Error fetching birds:', error);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async findMany({ skip, take }: { skip: number; take: number }) {

    const pageKey = `birds:page:${skip}:${take}`
    const cached = await this.cacheManager.get<Bird[]>(pageKey);
    if (cached) return cached;

    try {
      const birds = await this.prisma.species.findMany({
        skip,
        take,
        orderBy: { scientificName: 'asc' },
        select: {
          id: true,
          spanish_commonName: true,
          english_commonName: true,
          scientificName: true,
          conservationStatus: true,
          status: true,
          description: true,
          imageUrl: true,
          distribution: true,
        },
      });
      await this.cacheManager.set(pageKey, birds, 1800);
      return birds;
    } catch (error) {
      console.error('Error fetching paginated birds:', error);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async count() {
    try {
      return await this.prisma.species.count();
    } catch (error) {
      console.error('Error counting birds:', error);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Unknown error');
    }
  }


  async searchByAnyName(query: string) {
  try {
    return await this.prisma.species.findMany({
      where: {
        OR: [
          { scientificName: { contains: query, mode: 'insensitive' } },
          { english_commonName: { contains: query, mode: 'insensitive' } },
          { spanish_commonName: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        spanish_commonName: true,
        english_commonName: true,
        scientificName: true,
        conservationStatus: true,
        description: true,
        imageUrl: true,
        distribution: true,
        status: true,
      },
    });
  } catch (error) {
    console.error('Error searching species by name:', error);
    throw new Error('No se pudo realizar la búsqueda de especies');
  }
}

  async getEndangeredSpecies(statusCodes?: string[]) {
    const key = statusCodes?.length
      ? `birds:endangered:${statusCodes.join(',')}`
      : 'birds:endangered:all';

    const cached = await this.cacheManager.get<Bird[]>(key);
    if (cached) return cached;


    try {
      const whereClause: Prisma.SpeciesWhereInput = {
        conservationStatus: {
          in: ['EN', 'CR', 'VU'], // especies en peligro
        },
        ...(statusCodes?.length && {
          status: {
            hasSome: statusCodes,
          },
        }),
      };

      const endangered = await this.prisma.species.findMany({
        where: whereClause,
        select: {
          id: true,
          spanish_commonName: true,
          english_commonName: true,
          scientificName: true,
          conservationStatus: true,
          description: true,
          imageUrl: true,
          distribution: true,
          status: true,
        },
      });

      return endangered;
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async getSpeciesByStatus(status: string[], skip: number, take: number) {
    return await this.prisma.species.findMany({
      where: {
        status: {
          hasSome: status,
        },
        NOT: {
          status: {
            hasEvery: ['M', 'R'],
          },
        },
      },
      skip,
      take,
      select: {
        id: true,
        spanish_commonName: true,
        english_commonName: true,
        scientificName: true,
        conservationStatus: true,
        description: true,
        imageUrl: true,
        distribution: true,
        status: true,
      },
    });
  }

  async countSpeciesByStatus(status: string[]) {
    return await this.prisma.species.count({
      where: {
        status: {
          hasSome: status,
        },
      },
    });
  }

  async getSpeciesWithMixedStatus(skip: number, take: number) {
    return await this.prisma.species.findMany({
      where: {
        status: {
          hasEvery: ['M', 'R'],
        },
      },
      skip,
      take,
      select: {
        id: true,
        spanish_commonName: true,
        english_commonName: true,
        scientificName: true,
        conservationStatus: true,
        description: true,
        imageUrl: true,
        distribution: true,
        status: true,
      },
    });
  }

  async countSpeciesWithMixedStatus() {
    return await this.prisma.species.count({
      where: {
        status: {
          hasEvery: ['M', 'R'],
        },
      },
    });
  }

  async getSpeciesById(id: string) {
    const bird = await this.prisma.species.findFirst({ where: { id } });

    if (!bird) throw new NotFoundException(`Especie con id: ${id} no encontrada`);

    return bird;
  }


}
