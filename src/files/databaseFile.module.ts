import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFileController from './databaseFile.controller';
import DatabaseFile from './databaseFile.entity';
import { DatabaseFileService } from './databaseFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile])],
  controllers: [DatabaseFileController],
  providers: [DatabaseFileService],
  exports: [DatabaseFileService],
})
export class DatabaseFileModule {}
