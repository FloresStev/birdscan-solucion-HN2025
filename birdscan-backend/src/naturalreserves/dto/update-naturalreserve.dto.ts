import { PartialType } from '@nestjs/mapped-types';
import { CreateNaturalreserveDto } from './create-naturalreserve.dto';

export class UpdateNaturalreserveDto extends PartialType(CreateNaturalreserveDto) {}
