import { Injectable } from '@nestjs/common';
import { DescendantObjectsArray } from '../../models/descendantsTypes';
import { ExternalGroup } from '../../models/externalGroupTypes';
import { TraitObjectsArray } from '../../models/traitsTypes';

interface Props {
  traits: TraitObjectsArray;
  externalGroup: ExternalGroup;
  descendants: DescendantObjectsArray;
}

@Injectable()
export class PhylogeneticTreeScriptsService {
  generateNewick(props: Props) {
    console.log(this.generateNewick(props));
    return this.generateNewick(props);
  }
}
