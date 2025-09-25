import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            socket: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),


            },
        });

        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    async blacklistToken(token: string, ttl: number) {
        await this.connect();
        await this.client.set(`bl_${token}`, 'revoked', { EX: ttl });
    }

    async isBlacklisted(token: string): Promise<boolean> {
        await this.connect();
        const result = await this.client.get(`bl_${token}`);
        return result === 'revoked';
    }

    async onModuleDestroy() {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }
}