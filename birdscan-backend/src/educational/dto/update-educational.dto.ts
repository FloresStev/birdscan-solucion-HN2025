import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalDto } from './create-educational.dto';

export class UpdateEducationalDto extends PartialType(CreateEducationalDto) {}
