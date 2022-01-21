import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { getConnection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn({
    email,
    password,
  }: {email: string, password: string}): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email, permissions: [] };
      const accessToken: string = await this.jwtService.sign(payload);
      const nameUser: string = user.name;
      return {  message:'Bienvenido', nameUser, accessToken };
    }
    throw new UnauthorizedException('Username/password incorrect.');
  }

  async getAuth({
    accessToken}: {accessToken: string}):Promise<any>{
    
    try {
      // const cifrado: string = await this.jwtService.verify(accessToken);
      // const email = cifrado;
      // console.log(email);
      // const user = await this.usersRepository.findOne({ email });
      return { message:'Bienvenido' };
    } catch (error) {
        // res.status(401).json({msg: 'Token no válido'});
    }
      
  }
}

  
