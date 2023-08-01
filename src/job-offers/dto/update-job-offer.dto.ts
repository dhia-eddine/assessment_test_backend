import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator';

export class UpdateJobOfferDto {
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  applicationDeadline: Date;

  @IsNotEmpty()
  @IsBoolean()
  isOpen: boolean;
}
