import { Module } from '@nestjs/common';
import { NaturalreservesService } from './naturalreserves.service';
import { NaturalreservesController } from './naturalreserves.controller';

@Module({
  controllers: [NaturalreservesController],
  providers: [NaturalreservesService],
})
export class NaturalreservesModule {}
