import { IsNotEmpty, IsString, IsArray, ArrayMinSize, ArrayMaxSize, MinLength, MaxLength } from 'class-validator';

export class AssessmentQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  question: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  answers: string[];

  @IsNotEmpty()
  correctAnswerIndex: number;
}
