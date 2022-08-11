import { IsNotEmpty, IsString } from 'class-validator';

export class CheckVerificationCodeData {
  @IsString()
  @IsNotEmpty()
  code: string;
}
