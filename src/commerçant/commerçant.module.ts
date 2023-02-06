import { Module } from '@nestjs/common';
import { CommerçantController } from './commerçant.controller';
import { CommerçantService } from './commerçant.service';

@Module({
  controllers: [CommerçantController],
  providers: [CommerçantService]
})
export class CommerçantModule {}
