import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BirdsModule } from './birds/birds.module';
import { EventsModule } from './events/events.module';
import { NaturalreservesModule } from './naturalreserves/naturalreserves.module';
import { ToursModule } from './tours/tours.module';
import { EducationalModule } from './educational/educational.module';
import { MapsModule } from './maps/maps.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),
    UsersModule,
    BirdsModule,
    EventsModule,
    NaturalreservesModule,
    ToursModule,
    EducationalModule,
    MapsModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
