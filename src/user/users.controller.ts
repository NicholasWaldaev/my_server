import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { UserService } from './user.service';
import { FileUploadDto } from './dto/fileUpload.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
    type: FileUploadDto,
  })
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get()
  async getUser() {
    return await this.userService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param() id: number) {
    return await this.userService.deleteUser(id);
  }
}
