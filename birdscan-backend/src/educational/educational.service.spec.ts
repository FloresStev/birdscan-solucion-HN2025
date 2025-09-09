import { Test, TestingModule } from '@nestjs/testing';
import { EducationalService } from './educational.service';

describe('EducationalService', () => {
  let service: EducationalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalService],
    }).compile();

    service = module.get<EducationalService>(EducationalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
