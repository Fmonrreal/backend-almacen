import { IsString, Matches, MaxLength, MinLength,IsDate,IsOptional } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(250)
  @Matches(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    { message: 'Invalid email' },
  )
  email: string;

  @IsString()
  @MinLength(8)
    @Matches(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password is too weak' },
    )
  password: string;


  @IsString()
  name: string;

  @IsString()
  paternal_name: string;

  @IsOptional()
  @IsString()    
  maternal_name: string;

  @IsString()
  permissions: string;

  // @IsDate()
  // loggedAt: Date;

  // @IsDate()
  // createdAt: Date;

  // // @UpdateDateColumn()
  // @Column('datetime', { nullable: true })
  // updatedAt: Date;
}
