import { Module } from '@nestjs/common';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from './entities/produit.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ClientModule } from 'src/client/client.module';
import { CommandesModule } from 'src/commandes/commandes.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProduitEntity]) , ClientModule , CommandesModule ],
  controllers: [ProduitController],
  providers: [ProduitService]
  

})
export class ProduitModule {}
