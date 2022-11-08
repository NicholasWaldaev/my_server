import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/files/databaseFile.module';
import User from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseFileModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
