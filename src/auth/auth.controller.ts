import { Body, Controller, Post,Get,Headers} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';
import {lanzarEmail} from './lanzarEmail';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body() {
      email,
      password,
    }: {email: string, password: string},
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn({
      email,
      password,
    });
  }

  // @Get('/')
  // getAuth(
  //   @Body()
  //     accessToken:string
  //   ):Promise<any>{
  //     return this.authService.getAuth({
  //       accessToken
  //     });
  //   }


    // @Get('/')
    // getAuth(
    //   @Body()
    //     email:string
    //   ):Promise<any>{
    //     return this.authService.getAuth({
    //       email
    //     });
    //   }


    // @Get('/me')
    // // @ApiBearerAuth()
    // // @UseGuards(AuthGuard('jwt'))
    // async getUserById(@GetUser('email') email:string): Promise<User> {
    //     return await this.authService.getUserByEmail(email);
    // }

    // @Get('/me')
    // // @ApiBearerAuth()
    // // @UseGuards(AuthGuard('jwt'))
    // getUserByEmail(
    //   @lanzarEmail() email:string): Promise<User> {
    //     return this.authService.getUserByEmail(email);
    // }

    // @Get('/me')
    // getUserByEmail(
    // @Body() {
    //   email
    // }: {email: string}): Promise<any> {
    //     return this.authService.getUserByEmail({email});
    // }

    // @Get('/me')
    // // getUserByEmail(
    //   async getUserByEmail(@GetUser('email') email:string): Promise<any>{
    //     console.log(email)
    //     return await this.authService.getUserByEmail({email});
    // }


    // @Get('/me')
    // getUserByToken(
    //   @Body(){
    //     xtoken
    //   }:{xtoken:string}):Promise<any>{
    //     return this.authService.getUserByToken({xtoken});
    // }

    @Get('/')
    getUserByToken(
      @Headers(){
        xtoken
      }:{xtoken:string}):Promise<any>{
        return this.authService.getUserByToken({xtoken});
    }
    
}