import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { OptimizeController } from './optimize.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
      processors: [
        {
          name: 'optimize',
          path: path.join(__dirname, 'image.processor.js'),
        },
      ],
    }),
  ],
  providers: [],
  exports: [],
  controllers: [OptimizeController],
})
export class OptimizeModule {}
