import { Module } from '@nestjs/common';
import { EducationalService } from './educational.service';
import { EducationalController } from './educational.controller';

@Module({
  controllers: [EducationalController],
  providers: [EducationalService],
})
export class EducationalModule {}
