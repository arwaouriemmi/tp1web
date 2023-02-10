import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { CommerçantModule } from './commerçant/commerçant.module';
import { ProduitModule } from './produit/produit.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { ClientEntity } from './client/entities/client.entity';
import { ProduitEntity } from './produit/entities/produit.entity';
import { CommerçantEntity } from './commerçant/entities/commerçant.entity';
import { CommandesEntity } from './commandes/entities/commandes.entity';


dotenv.config();

@Module({
  imports: [
    ConfigModule ,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'e-commerce',
      entities: [ClientEntity,ProduitEntity,CommerçantEntity,CommandesEntity],
      synchronize: true,
    }),
    ClientModule,
    CommerçantModule,
    ProduitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
