import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
        await this.$connect();
        } catch (error) {
        if (error instanceof Error) {
            console.error('Error connecting to database:', error.message);
        }
        }
    }
}
