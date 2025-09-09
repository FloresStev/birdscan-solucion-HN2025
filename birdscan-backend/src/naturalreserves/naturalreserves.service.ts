import { Injectable } from '@nestjs/common';
import { CreateNaturalreserveDto } from './dto/create-naturalreserve.dto';
import { UpdateNaturalreserveDto } from './dto/update-naturalreserve.dto';

@Injectable()
export class NaturalreservesService {
  create(createNaturalreserveDto: CreateNaturalreserveDto) {
    return 'This action adds a new naturalreserve';
  }

  findAll() {
    return `This action returns all naturalreserves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naturalreserve`;
  }

  update(id: number, updateNaturalreserveDto: UpdateNaturalreserveDto) {
    return `This action updates a #${id} naturalreserve`;
  }

  remove(id: number) {
    return `This action removes a #${id} naturalreserve`;
  }
}
