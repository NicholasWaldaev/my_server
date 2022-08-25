import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UserModule } from 'src/user/user.module';
import { GoogleAuthenticationController } from './googleAuthentication.controller';
import { GoogleAuthenticationService } from './googleAuthentication.service';

@Module({
  imports: [UserModule, ConfigModule, AuthenticationModule],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService],
})
export class GoogleAuthenticationModule {}
