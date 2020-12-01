import {  IsString, IsBoolean} from 'class-validator';

export class CreateSondageDto {


  @IsString()
  public titre: string;
  @IsString()
  public description: string;

}
