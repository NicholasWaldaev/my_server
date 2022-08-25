import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    deprecated: true,
    description: 'Use the name property instead',
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @ApiProperty({
    description: 'Has to match a regular expression: ----',
    example: '+7 999 999 99 99',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/(^\+7\d{10}$)/)
  phoneNumber: string;
}

export default RegisterDto;
