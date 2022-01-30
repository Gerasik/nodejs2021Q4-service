import { IsOptional, IsString } from 'class-validator';

export class UpdateUserAnswerDto {
  constructor({ id, name, login }: UpdateUserAnswerDto) {
    this.id = id;
    this.name = name;
    this.login = login;
  }

  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public login?: string;
}
