import { Test, TestingModule } from '@nestjs/testing';
import { NaturalreservesService } from './naturalreserves.service';

describe('NaturalreservesService', () => {
  let service: NaturalreservesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaturalreservesService],
    }).compile();

    service = module.get<NaturalreservesService>(NaturalreservesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
