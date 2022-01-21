import { Body, Controller, Post,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

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

  @Get('/')
  getAuth(
    @Body()
      accessToken:string
    ):Promise<any>{
      return this.authService.getAuth({
        accessToken
      });
    }

}