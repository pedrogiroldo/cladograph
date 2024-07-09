import { Body, Controller, Post } from '@nestjs/common';
import { PhylogeneticTreeScriptsService } from './phylogenetic-tree-scripts.service';
/* eslint-disable no-else-return */
import { DescendantObjectsArray } from '../models/descendantsTypes';
import { ExternalGroup } from '../models/externalGroupTypes';
import { TraitObjectsArray } from '../models/traitsTypes';

interface Props {
  traits: TraitObjectsArray;
  externalGroup: ExternalGroup;
  descendants: DescendantObjectsArray;
}

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
