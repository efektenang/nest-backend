import { IsAlpha, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsString()
  position: string;
}
1;
