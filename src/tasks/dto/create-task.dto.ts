import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // validation
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
