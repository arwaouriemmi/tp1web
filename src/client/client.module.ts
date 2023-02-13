import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv' ;
dotenv.config() ;
@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({
    secret:"UserSecretKey",
    signOptions:{
      expiresIn:3600
    }
  })
  
],
  controllers: [ClientController],
  providers: [ClientService,JwtService],
  exports:[ClientService]
})
export class ClientModule {}
