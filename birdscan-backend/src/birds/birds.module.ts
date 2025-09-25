import { Module } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { BirdsController } from './birds.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BirdsController],
  providers: [BirdsService],
  imports: [PrismaModule]
})
export class BirdsModule {}
