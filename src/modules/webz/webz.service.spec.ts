import { Test, TestingModule } from '@nestjs/testing';
import { WebzService } from './webz.service';

describe('WebzService', () => {
  let service: WebzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebzService],
    }).compile();

    service = module.get<WebzService>(WebzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
