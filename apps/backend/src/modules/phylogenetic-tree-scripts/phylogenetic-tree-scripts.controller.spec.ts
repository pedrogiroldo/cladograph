import { Test, TestingModule } from '@nestjs/testing';
import { PhylogeneticTreeScriptsController } from './phylogenetic-tree-scripts.controller';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';

describe('PhylogeneticTreeScriptsController', () => {
  let controller: PhylogeneticTreeScriptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhylogeneticTreeScriptsController],
      providers: [PhylogeneticTreeScriptsService],
    }).compile();

    controller = module.get<PhylogeneticTreeScriptsController>(PhylogeneticTreeScriptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
