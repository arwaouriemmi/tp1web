import { Module } from '@nestjs/common';
import { PremierController } from './premier.controller';
import { PremierService } from './premier.service';
import * as dotenv from 'dotenv' ;
dotenv.config() ;
@Module({
  controllers: [PremierController],
  providers: [PremierService]
  
})
export class PremierModule {}
