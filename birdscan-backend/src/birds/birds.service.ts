import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BirdsService {
  constructor(private prisma: PrismaService) {

  }


  async findAll() {
    try {
      const birds = await this.prisma.species.findMany({
        select: {
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


  async getSpecieByName(
    scientificName?: string,
    english_commonName?: string,
    spanish_commonName?: string,
  ) {
    try {
      const orConditions: any[] = [];
      if (scientificName) orConditions.push({ scientificName });
      if (english_commonName) orConditions.push({ english_commonName });
      if (spanish_commonName) orConditions.push({ spanish_commonName });

      if (orConditions.length === 0) {
        throw new BadRequestException("At least one query parameter is required");
      }

      const bird = await this.prisma.species.findFirst({
        where: {
          OR: orConditions,
        },
      });

      if (!bird) throw new NotFoundException("Specie not found");

      return bird;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async getEndangeredSpecies() {
    try {
      const endangered = await this.prisma.species.findMany({
        where: {
          conservationStatus: {
            in: ["EN", "CR", "VU"],
          },
        },
        select: {
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
      throw new InternalServerErrorException(error instanceof Error ? error.message : "Unknown error");
    }
  }

}
