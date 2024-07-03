import { DescendantObjectsArray } from 'src/models/descendantsTypes';
import { ExternalGroup } from 'src/models/externalGroupTypes';
import Traits from './Traits';
import Descendants from './Descendants';

export default class NewickGenerator {
  private traits: Traits;
  private externalGroup: ExternalGroup;
  private descendants: Descendants;

  constructor(traits, externalGroup, descendants) {
    this.traits.setTraits(traits);
    this.descendants.setDescendants(descendants);
    this.externalGroup = externalGroup;
    this.descendants = descendants;

    this.generateNewick();
  }

  private generateNewick() {
    const traitsAndNumberOfDescendantsThatHaveThem =
      this.calculateDescendantsOfAnTraitAndReturnTraitWithThisInfo();
  }

  private calculateDescendantsOfAnTraitAndReturnTraitWithThisInfo() {}
}
