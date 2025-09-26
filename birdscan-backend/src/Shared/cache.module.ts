import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: 'redis',
            port: 6379,
            ttl: 3600,
        }),
    ],
    exports: [CacheModule],
})
export class SharedCacheModule { }