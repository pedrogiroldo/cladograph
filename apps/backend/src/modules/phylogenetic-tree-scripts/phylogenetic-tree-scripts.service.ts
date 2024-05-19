import { Injectable } from '@nestjs/common';
import { CreatePhylogeneticTreeScriptDto } from './dto/create-phylogenetic-tree-script.dto';
import { UpdatePhylogeneticTreeScriptDto } from './dto/update-phylogenetic-tree-script.dto';

@Injectable()
export class PhylogeneticTreeScriptsService {
  create(createPhylogeneticTreeScriptDto: CreatePhylogeneticTreeScriptDto) {
    return 'This action adds a new phylogeneticTreeScript';
  }

  findAll() {
    return `This action returns all phylogeneticTreeScripts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phylogeneticTreeScript`;
  }

  update(id: number, updatePhylogeneticTreeScriptDto: UpdatePhylogeneticTreeScriptDto) {
    return `This action updates a #${id} phylogeneticTreeScript`;
  }

  remove(id: number) {
    return `This action removes a #${id} phylogeneticTreeScript`;
  }
}
