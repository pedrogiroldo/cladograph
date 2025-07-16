import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';
import { DescendantObjectsArray } from '../models/descendantsTypes';
import { ExternalGroup } from '../models/externalGroupTypes';
import { TraitObjectsArray } from '../models/traitsTypes';
import { UsersGuard } from '../guards/users.guard';

interface Props {
  traits: TraitObjectsArray;
  externalGroup: ExternalGroup;
  descendants: DescendantObjectsArray;
}

@UseGuards(UsersGuard)
@Controller('phylogenetic-tree-scripts')
export class PhylogeneticTreeScriptsController {
  constructor(
    private readonly phylogeneticTreeScriptsService: PhylogeneticTreeScriptsService,
  ) {}

  @Post()
  generateNewick(@Body() props: Props) {
    return this.phylogeneticTreeScriptsService.generateNewick(props);
  }
}
