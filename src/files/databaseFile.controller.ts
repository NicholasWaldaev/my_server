import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';
import { DatabaseFileService } from './databaseFile.service';

@Controller('database-file')
@UseInterceptors(ClassSerializerInterceptor)
export default class DatabaseFileController {
  constructor(private readonly databaseFileService: DatabaseFileService) {}

  @Get(':id')
  async getDatabaseFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.databaseFileService.getFileById(id);
    const stream = Readable.from(file.data);

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': 'image/png',
    });

    return new StreamableFile(stream);
  }
}
