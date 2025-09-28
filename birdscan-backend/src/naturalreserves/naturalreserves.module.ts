import { Module } from '@nestjs/common';
import { NaturalreservesService } from './naturalreserves.service';
import { NaturalreservesController } from './naturalreserves.controller';
import { SharedCacheModule } from 'src/Shared/cache.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NaturalreservesController],
  providers: [NaturalreservesService],
  imports:[PrismaModule, SharedCacheModule]
})
export class NaturalreservesModule {}
