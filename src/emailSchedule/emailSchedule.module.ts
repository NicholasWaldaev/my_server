import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import EmailSchedulingController from './emailSchedule.controller';
import { EmailSchedulingService } from './emailSchedule.service';

@Module({
  imports: [EmailModule],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
