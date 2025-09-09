import { Test, TestingModule } from '@nestjs/testing';
import { EducationalController } from './educational.controller';
import { EducationalService } from './educational.service';

describe('EducationalController', () => {
  let controller: EducationalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalController],
      providers: [EducationalService],
    }).compile();

    controller = module.get<EducationalController>(EducationalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
