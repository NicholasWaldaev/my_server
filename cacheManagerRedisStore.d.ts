declare module 'cahce-manager-redis-store' {
  import { CacheStoreFactory } from '@nestjs/common/cache/interfaces/cache-manager.interface';

  const cacheStore: CacheStoreFactory;

  export = cacheStore;
}
