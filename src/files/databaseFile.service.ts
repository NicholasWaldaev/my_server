import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import DatabaseFile from './databaseFile.entity';

@Injectable()
export class DatabaseFileService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFileRepository: Repository<DatabaseFile>,
  ) {}

  async uploadDatabaseFileWithQueryRunner(
    dataBuffer: Buffer,
    filename: string,
    queryRunner: QueryRunner,
  ) {
    const newFile = await queryRunner.manager.create(DatabaseFile, {
      filename,
      data: dataBuffer,
    });
    await queryRunner.manager.save(DatabaseFile, newFile);
    return newFile;
  }

  async deleteFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
    const deleteResponse = await queryRunner.manager.delete(
      DatabaseFile,
      fileId,
    );
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }

  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.databaseFileRepository.create({
      filename,
      data: dataBuffer,
    });
    await this.databaseFileRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.databaseFileRepository.findOne({
      where: { id: fileId },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
