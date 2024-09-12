import { Injectable } from '@nestjs/common';
import { DescendantObjectsArray } from '../models/descendantsTypes';
import { ExternalGroup } from '../models/externalGroupTypes';
import { TraitObjectsArray } from '../models/traitsTypes';
import NewickGenerator from '../modules/newickGenerator/NewickGenerator';

interface Props {
  traits: TraitObjectsArray;
  externalGroup: ExternalGroup;
  descendants: DescendantObjectsArray;
}

@Injectable()
export class PhylogeneticTreeScriptsService {
  generateNewick(props: Props) {
    const { traits, externalGroup, descendants } = props;

    const newickGenerator = new NewickGenerator(
      traits,
      externalGroup,
      descendants,
    );

    return {
      newick: newickGenerator.getNewick(),
      descendants: newickGenerator.getDescendants(),
    };
  }
}
