import { Test, TestingModule } from '@nestjs/testing';
import { CentryfugoService } from './centryfugo.service';

describe('CentryfugoService', () => {
  let service: CentryfugoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentryfugoService],
    }).compile();

    service = module.get<CentryfugoService>(CentryfugoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
