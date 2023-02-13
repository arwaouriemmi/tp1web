import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from "bcrypt" ;
import { UsersubscribeDto } from './dto/user-subscribe.dto';
import { UserloginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository : Repository <ClientEntity> ,
        private jwtService:JwtService
       
        
    ){}
    async find(id:number) : Promise<ClientEntity>{
        return await this.clientRepository.findOneBy({client_id: id});

    }
    async update(client_id: number ,client:UpdateClientDto) : Promise<ClientEntity>{
        const newclient = await this.clientRepository.preload({
            client_id,
            ...client
        });
       return await this.clientRepository.save(newclient) ;

    }
    async register(userdata:UsersubscribeDto) : Promise<ClientEntity>{
        const user = this.clientRepository.create({...userdata});
        user.salt=await bcrypt.genSalt();
        user.mdp=await bcrypt.hash(user.mdp,user.salt);
        try{
            await this.clientRepository.save(user);
        } catch(e){
            throw new ConflictException("le user name et le password doivent etre unique") ;
        }
       return user ;

    }
    async login(credentials:UserloginDto):Promise<Partial<ClientEntity>>{

        const {email , mdp}=credentials;
        const user =await this.clientRepository.createQueryBuilder("user")
             .where("user.email= :email",{email})
             .getOne() ;
        if (!user){
            throw new NotFoundException("email ou mot de passe erroné");
        }
        const hashedPassword =await bcrypt.hash(mdp,user.salt);
        if (hashedPassword==user.mdp){
           // const payload={
           //     email: user.email
           // };
           // const jwt=await this.jwtService.sign(payload);
            return{
                email: user.email
            };
        }
        else{
            throw new NotFoundException("mot de passe erroné");
        }


    }
  
}
