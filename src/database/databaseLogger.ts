import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');

  logQuery(query: string, parametrs?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.log(
      `${query} -- Parametrs: ${this.stringifyParametrs(
        parametrs,
      )} -- ${parametrs}`,
    );
  }

  logQueryError(
    error: string,
    query: string,
    parametrs?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.error(
      `${query} -- Parametrs: ${this.stringifyParametrs(
        parametrs,
      )} -- ${error}`,
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parametrs?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.warn(
      `Time: ${time} -- Parametrs: ${this.stringifyParametrs(
        parametrs,
      )} -- ${query}`,
    );
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    if (level === 'log') {
      return this.logger.log(message);
    }

    if (level === 'info') {
      return this.logger.debug(message);
    }

    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }

  private stringifyParametrs(paramets?: unknown[]) {
    try {
      return JSON.stringify(paramets);
    } catch {
      return '';
    }
  }
}

export default DatabaseLogger;
