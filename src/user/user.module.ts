import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from './entity/address.entity';
import User from './entity/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
