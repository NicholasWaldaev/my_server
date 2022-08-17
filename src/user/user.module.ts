import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/files/databaseFile.module';
import Address from './entity/address.entity';
import User from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]), DatabaseFileModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
