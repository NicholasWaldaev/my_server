import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CheckVerificationCodeData } from './dto/checkVerificationCodeData.dto';
import SmsService from './sms.service';

@Controller('sms')
@UseInterceptors(ClassSerializerInterceptor)
export default class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('initiate-verification')
  @UseGuards(JwtAuthenticationGuard)
  async initiatePhoneNumberVerification(@Req() request: RequestWithUser) {
    if (request.user.isPhoneNumberConfirmed) {
      throw new BadRequestException('Phone number already confirmed');
    }

    await this.smsService.initiatePhoneNumberVerification(
      request.user.phoneNumber,
    );
  }

  @Post('check-verification-code')
  @UseGuards(JwtAuthenticationGuard)
  async checkVerificationCode(
    @Req() request: RequestWithUser,
    @Body() verificationData: CheckVerificationCodeData,
  ) {
    const { id, phoneNumber, isPhoneNumberConfirmed } = request.user;
    if (isPhoneNumberConfirmed) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.smsService.confirmPhoneNumber(
      id,
      phoneNumber,
      verificationData.code,
    );
  }
}
