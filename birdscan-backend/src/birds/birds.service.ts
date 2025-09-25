import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BirdsService {
  constructor(private prisma: PrismaService) {

  }


  async findAll() {
    try {
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
      return birds;
    } catch (error) {
      console.error('Error fetching birds:', error);
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async findMany({ skip, take }: { skip: number; take: number }) {
    try {
      const birds = await this.prisma.species.findMany({
        skip,
        take,
        orderBy: { spanish_commonName: 'asc' },
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
    return this.prisma.species.findMany({
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
  }

  async getEndangeredSpecies(statusCodes?: string[]) {
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

  async getSpeciesById(id: string) {
    const bird = await this.prisma.species.findFirst({ where: { id } });

    if (!bird) throw new NotFoundException(`Especie con id: ${id} no encontrada`);

    return bird;
  }

}
