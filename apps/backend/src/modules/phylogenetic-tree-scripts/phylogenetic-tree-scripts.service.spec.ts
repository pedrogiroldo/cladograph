import { Test, TestingModule } from '@nestjs/testing';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';

describe('PhylogeneticTreeScriptsService', () => {
  let service: PhylogeneticTreeScriptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhylogeneticTreeScriptsService],
    }).compile();

    service = module.get<PhylogeneticTreeScriptsService>(PhylogeneticTreeScriptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
