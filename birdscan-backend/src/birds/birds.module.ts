import { Module } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { BirdsController } from './birds.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { SharedCacheModule } from 'src/Shared/cache.module';

@Module({
  controllers: [BirdsController],
  providers: [BirdsService],
  imports: [PrismaModule,  SharedCacheModule]

})
export class BirdsModule {}
