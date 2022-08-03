import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import mockedConfigService from '../../utils/mocks/config.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import User from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../authentication.service';

describe('The AuthentucationService', () => {
  let authenticatationService: AuthenticationService;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    authenticatationService = await module.get<AuthenticationService>(
      AuthenticationService,
    );
    userService = await module.get<UserService>(UserService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 2;
      expect(
        typeof authenticatationService.getCookieWithJwtToken(userId),
      ).toEqual('string');
    });
  });
});
