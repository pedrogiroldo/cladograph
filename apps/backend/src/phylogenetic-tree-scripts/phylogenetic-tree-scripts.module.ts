import { Module } from '@nestjs/common';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';
import { PhylogeneticTreeScriptsController } from './phylogenetic-tree-scripts.controller';

@Module({
  controllers: [PhylogeneticTreeScriptsController],
  providers: [PhylogeneticTreeScriptsService],
})
export class PhylogeneticTreeScriptsModule {}
