import { Injectable } from '@nestjs/common';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';

@Injectable()
export class BirdsService {
  create(createBirdDto: CreateBirdDto) {
    return 'This action adds a new bird';
  }

  findAll() {
    return `This action returns all birds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bird`;
  }

  update(id: number, updateBirdDto: UpdateBirdDto) {
    return `This action updates a #${id} bird`;
  }

  remove(id: number) {
    return `This action removes a #${id} bird`;
  }
}
