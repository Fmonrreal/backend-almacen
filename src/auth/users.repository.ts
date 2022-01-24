import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ email, password,name,paternal_name,maternal_name,permissions}: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      email,
      password: hashedPassword,
      name,
      paternal_name,
      maternal_name,
      permissions
    });
    try {
      await this.save(user);
    } catch (error) {
      // check error.code
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(
        error
      );
    }
  }

//   async getUserByName(email: string): Promise<User> {
//     return this.usersRepository.findOne({ email });
// }
// async getUserByEmail(email: string): Promise<User> {
//   console.log(email) 
//   // const user: User = await this.usersRepository.findOne(email);
//   if (!user) {
//     console.log("no existe el ususario");
//     throw new UnauthorizedException();
//   }
//   return user;
// }

// async validate({ email }: JwtPayload): Promise<User> {
//   const user: User = await this.usersRepository.findOne(email);
//   if (!user) {
//     console.log("no existe el ususario");
//     throw new UnauthorizedException();
//   }
//   return user;
// }
}
