import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

import User from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: User,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }

  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );

    console.log(otpauthUrl);

    await this.userService.setTwoFactorAuthenticationSecret(secret, user.id);

    return { secret, otpauthUrl };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
