import { IsString } from 'class-validator';

export class CreatePoolDto {
  @IsString()
  nombre: string;
}
