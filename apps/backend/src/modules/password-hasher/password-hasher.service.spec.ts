import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHasherService } from './password-hasher.service';

describe('PasswordHasherService', () => {
  let service: PasswordHasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHasherService],
    }).compile();

    service = module.get<PasswordHasherService>(PasswordHasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
