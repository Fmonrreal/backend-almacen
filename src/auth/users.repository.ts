import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  //Agregue name, paternal_name para poder grabar
  async createUser({ email, password}: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //Agregue name, paternal_name para poder grabar
    const user = this.create({
      email,
      password: hashedPassword
    });
    try {
      await this.save(user);
    } catch (error) {
      // check error.code
      console.log(error.code);
      if (error.code === '23000') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(
        error
      );
    }
  }
}
