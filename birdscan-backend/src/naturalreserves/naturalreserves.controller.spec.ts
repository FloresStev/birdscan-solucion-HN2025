import { Test, TestingModule } from '@nestjs/testing';
import { NaturalreservesController } from './naturalreserves.controller';
import { NaturalreservesService } from './naturalreserves.service';

describe('NaturalreservesController', () => {
  let controller: NaturalreservesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NaturalreservesController],
      providers: [NaturalreservesService],
    }).compile();

    controller = module.get<NaturalreservesController>(NaturalreservesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
