import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'), // add to .env
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({
    email,
  }: {email: string}): Promise<User> {
    console.log(email);
    const user: User = await this.usersRepository.findOne({email});
    console.log(user);
    if (!user) {
      console.log("no existe el ususario");
      throw new UnauthorizedException();
    }
    return user;
  }

  async validate_token({
    email,
  }: {email: string}): Promise<User> {
    console.log(email);
    const user: User = await this.usersRepository.findOne({email});
    console.log(user);
    if (!user) {
      console.log("no existe el ususario");
      throw new UnauthorizedException();
    }
    return user;
  }

  // async validate({ email }: JwtPayload): Promise<User> {
  //   const user: User = await this.usersRepository.findOne(email);
  //   if (!user) {
  //     console.log("no existe el ususario");
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
