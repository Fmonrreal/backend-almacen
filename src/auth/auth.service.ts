import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { getConnection } from 'typeorm';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy
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
      const payload: JwtPayload = { email};
      const accessToken: string = await this.jwtService.sign(payload);
      const nameUser: string = user.name;
      return {  message:'Bienvenido', nameUser, accessToken };
    }
    throw new UnauthorizedException('Username/password incorrect.');
  }

  // async getAuth({
  //   accessToken}):Promise<any>{
    
  //   try {
  //     // const payload: JwtPayload = accessToken;
  //     const cifrado: JwtPayload = await this.jwtService.verify(accessToken);
  //     const email = cifrado;
  //     console.log(email);
  //     // const user = await this.usersRepository.findOne({ email });
  //     return {accessToken, email};
  //   } catch (error) {
        // res.status(401).json({msg: 'Token no válido'});
  //   }
      
  // }


  async getAuth({
    email,
  }: {email: string}): Promise<any>{
    return this.jwtStrategy.validate({email});
  }
    
  //   try {
  //     // const payload: JwtPayload = accessToken;
  //     const cifrado: JwtPayload = await this.jwtService.verify(accessToken);
  //     const email = cifrado;
  //     console.log(email);
  //     // const user = await this.usersRepository.findOne({ email });
  //     return {accessToken, email};
  //   } catch (error) {
  //       // res.status(401).json({msg: 'Token no válido'});
  //   }
      
  // }

//   async getUserByEmail(email: string): Promise<User> {
//     const user: User = await this.usersRepository.getUserByEmail(email);
//     // return this.mapper.entityToDto(user);
//     return user;
// }

// async getUserByEmail(email: string): Promise<User> {
//   // const email = "lfmonrreal92@gmail.com";
//   const user: User = await this.usersRepository.getUserByEmail({email});
//   // return this.mapper.entityToDto(user);
//   return user;
// }


async getUserByEmail({
  email,
}: {email: string}): Promise<any> {
  // const email = "lfmonrreal92@gmail.com";
  return this.jwtStrategy.validate({email});
  // return this.mapper.entityToDto(user)
}


async getUserByToken({
  xtoken
}: {xtoken: string}): Promise<any> {
  if(!xtoken) {
    // return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    console.log("No hay Token, permiso no válido")
}
  // validar el token

  try {
    const cifrado = this.jwtService.verify(xtoken);
    const email = cifrado.email
    return this.jwtStrategy.validate({email});
    console.log("Token ha sido validado")
    // req.email = cifrado.email;
} catch (error) {
    // res.status(401).json({msg: ''});
    console.log("Token no válido")
}
}
}

  
