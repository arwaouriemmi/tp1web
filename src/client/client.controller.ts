import { Controller } from '@nestjs/common';
import { Body, Param,Get, Patch,Post } from '@nestjs/common/decorators';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { UsersubscribeDto } from './dto/user-subscribe.dto';
import { UserloginDto } from './dto/user-login.dto';
@Controller('client')
export class ClientController {
    constructor(
        private clientService:ClientService 
    ){}
    @Patch('update/:id')
    async updateClient(
     @Param('id',ParseIntPipe) id_Client:number ,
      @Body() UpdateClientDto : UpdateClientDto
    ): Promise<ClientEntity>{
        return await this.clientService.update(id_Client,UpdateClientDto);
     }
     @Post('register')
     register(
        @Body() userdata:UsersubscribeDto
     ):Promise<ClientEntity>{
        return this.clientService.register(userdata);
     }
     @Post('login')
     login(
        @Body() credentials:UserloginDto
     ):Promise<Partial<ClientEntity>>{
        return this.clientService.login(credentials);
     }
     
}
