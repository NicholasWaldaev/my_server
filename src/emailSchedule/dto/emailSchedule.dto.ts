import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

class EmailScheduleDto {
  @IsEmail()
  recipier: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  date: string;
}

export default EmailScheduleDto;
