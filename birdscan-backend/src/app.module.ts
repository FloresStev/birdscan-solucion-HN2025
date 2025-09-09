import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BirdsModule } from './birds/birds.module';
import { EventsModule } from './events/events.module';
import { NaturalreservesModule } from './naturalreserves/naturalreserves.module';
import { ToursModule } from './tours/tours.module';
import { EducationalModule } from './educational/educational.module';
import { MapsModule } from './maps/maps.module';

@Module({
  imports: [UsersModule, BirdsModule, EventsModule, NaturalreservesModule, ToursModule, EducationalModule, MapsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
