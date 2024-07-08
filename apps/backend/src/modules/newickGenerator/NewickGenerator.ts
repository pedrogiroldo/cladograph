// TODO criar documentação sobre classificação biológica para
// ajudar na compreensão do código

import { ExternalGroup } from 'src/models/externalGroupTypes';
import TraitsManager from './TraitsManager';
import DescendantsManager from './DescendantsManager';
import { Descendant } from 'src/models/descendantsTypes';
import {
  Trait,
  TraitAndNumberOfDescendantsThatHaveThemeObjectsArray,
} from 'src/models/traitsTypes';

export default class NewickGenerator {
  private traits = new TraitsManager();
  private traitsAndNumberOfDescendantsThatHaveThem: TraitAndNumberOfDescendantsThatHaveThemeObjectsArray;
  private externalGroup: ExternalGroup;
  protected descendants = new DescendantsManager();
  private newick: string;

  constructor(traits, externalGroup, descendants) {
    this.traits.setTraits(traits);
    this.descendants.setDescendants(descendants);
    this.descendants.removeDeletedTraitsFromBothTypesOfDescendants(
      this.traits.getTraits(),
    );
    this.externalGroup = externalGroup;

    this.newick = this.main();
  }

  public getNewick() {
    return this.newick;
  }

  private main() {
    // it's an important info to compare the traits after
    this.traitsAndNumberOfDescendantsThatHaveThem =
      this.returnTraitWithNumberOfDescendantsWhoHaveIt();

    const descendantsWithSinPlesAndApo = this.calculateSynPlesioAndApo();

    const sortedDescendants = descendantsWithSinPlesAndApo.sort(
      this.logicToCompareDescendants,
    );

    const newick = this.generateNewickWithSortedDescendants(sortedDescendants);

    return newick;
  }

  private returnTraitWithNumberOfDescendantsWhoHaveIt() {
    return this.traits.getTraits().map((trait) => {
      const numberOfDescendants = this.calculateDescendantsOfATrait(trait);

      return {
        ...trait,
        descendants: numberOfDescendants,
      };
    });
  }

  private calculateDescendantsOfATrait(trait: Trait): number {
    const descendants = this.descendants.getDescendants();
    return descendants.reduce((count, descendant) => {
      if (descendant.traitsIds.includes(trait.id)) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  private calculateSynPlesioAndApo() {
    const descendants = this.descendants.getDescendants();
    return descendants.map((descendant) => {
      descendant.synapomorphies = this.calculateSynapomorphies(descendant);
      descendant.plesiomorphies = this.calculatePlesiomorphies(descendant);
      descendant.apomorphies = this.calculateApomorphies(descendant);

      return descendant;
    });
  }

  private calculateSynapomorphies(descendant: Descendant) {
    let synapomorphies = 0;

    synapomorphies +=
      this.calculateSynOfTraitsThatMoreThanOneDescendantsHaveAndExternalGroupDoNot(
        descendant,
      );

    synapomorphies +=
      this.calculateSynOfTraitsThatExternalGroupHaveAndMoreThanOneDescendantsDoNot(
        descendant,
      );

    return synapomorphies;
  }

  private calculateSynOfTraitsThatMoreThanOneDescendantsHaveAndExternalGroupDoNot(
    descendant: Descendant,
  ) {
    let synapomorphies = 0;
    const externalGroupTraits = this.externalGroup.traitsIds;

    descendant.traitsIds.forEach((traitId) => {
      if (
        !externalGroupTraits.includes(traitId) &&
        this.traitsAndNumberOfDescendantsThatHaveThem.find(
          (traitWithNumberOfDescendants) => {
            return traitWithNumberOfDescendants.id === traitId;
          },
        ).descendants > 1
      ) {
        synapomorphies += 1;
      }
    });

    return synapomorphies;
  }

  private calculateSynOfTraitsThatExternalGroupHaveAndMoreThanOneDescendantsDoNot(
    descendant: Descendant,
  ) {
    let synapomorphies = 0;
    const allTraits = this.traits.getTraits();
    const externalGroupTraits = this.externalGroup.traitsIds;

    allTraits.forEach((trait) => {
      if (
        externalGroupTraits.includes(trait.id) &&
        !descendant.traitsIds.includes(trait.id) &&
        this.traitsAndNumberOfDescendantsThatHaveThem.find(
          (traitWithNumberOfDescendants) => {
            return traitWithNumberOfDescendants.id === trait.id;
          },
        ).descendants <
          this.descendants.getDescendants().length - 1
      ) {
        synapomorphies += 1;
      }
    });

    return synapomorphies;
  }

  private calculatePlesiomorphies(descendant: Descendant): number {
    let plesiomorphies = 0;

    plesiomorphies +=
      this.calculatePlesioOfTraitsThatDescendantsAndExternalGroupBothHave(
        descendant,
      );

    plesiomorphies +=
      this.calculatePlesioOfTraitsThatDescendantsAndExternalGroupBothDoNotHave(
        descendant,
      );

    return plesiomorphies;
  }

  private calculatePlesioOfTraitsThatDescendantsAndExternalGroupBothHave(
    descendant: Descendant,
  ) {
    const externalGroupTraits = this.externalGroup.traitsIds;
    let plesiomorphies = 0;

    externalGroupTraits.forEach((traitId) => {
      if (descendant.traitsIds.includes(traitId)) {
        plesiomorphies++;
      }
    });

    return plesiomorphies;
  }

  private calculatePlesioOfTraitsThatDescendantsAndExternalGroupBothDoNotHave(
    descendant: Descendant,
  ) {
    const externalGroupTraits = this.externalGroup.traitsIds;
    const allTraits = this.traits.getTraits();
    let plesiomorphies = 0;

    allTraits.forEach((trait) => {
      if (
        !descendant.traitsIds.includes(trait.id) &&
        !externalGroupTraits.includes(trait.id)
      ) {
        plesiomorphies++;
      }
    });

    return plesiomorphies;
  }

  private calculateApomorphies(descendant: Descendant) {
    let apomorphies = 0;

    apomorphies +=
      this.calculateApoOfTraitsThatExternalGroupDoNotHaveAndOnlyOneDescendantHave(
        descendant,
      );

    apomorphies +=
      this.calculateApoOfTraitsThatExternalGroupHaveAndOnlyOneDescendantDoNotHave(
        descendant,
      );

    return apomorphies;
  }

  private calculateApoOfTraitsThatExternalGroupDoNotHaveAndOnlyOneDescendantHave(
    descendant: Descendant,
  ) {
    let apomorphies = 0;
    const externalGroupTraits = this.externalGroup.traitsIds;

    descendant.traitsIds.forEach((traitId) => {
      if (
        !externalGroupTraits.includes(traitId) &&
        this.traitsAndNumberOfDescendantsThatHaveThem.find(
          (traitWithNumberOfDescendants) => {
            return traitWithNumberOfDescendants.id === traitId;
          },
        ).descendants === 1
      ) {
        apomorphies += 1;
      }
    });

    return apomorphies;
  }

  private calculateApoOfTraitsThatExternalGroupHaveAndOnlyOneDescendantDoNotHave(
    descendant: Descendant,
  ) {
    let apomorphies = 0;
    const allTraits = this.traits.getTraits();
    const externalGroupTraits = this.externalGroup.traitsIds;

    allTraits.forEach((trait) => {
      if (
        externalGroupTraits.includes(trait.id) &&
        !descendant.traitsIds.includes(trait.id) &&
        this.traitsAndNumberOfDescendantsThatHaveThem.find(
          (traitWithNumberOfDescendants) => {
            return traitWithNumberOfDescendants.id === trait.id;
          },
        ).descendants ===
          this.descendants.getDescendants().length - 1
      ) {
        apomorphies += 1;
      }
    });

    return apomorphies;
  }

  private logicToCompareDescendants(a: any, b: any) {
    if (a.synapomorphies !== b.synapomorphies) {
      return a.synapomorphies - b.synapomorphies; // Ordena por Sin em ordem descendente
    } else if (a.plesiomorphies !== b.plesiomorphies) {
      return b.plesiomorphies - a.plesiomorphies; // Ordena por Ples em ordem ascendente
    } else {
      return a.apomorphies - b.apomorphies; // Ordena por Apo em ordem descendente
    }
  }

  private generateNewickWithSortedDescendants(sortedDescendants) {
    return (
      sortedDescendants
        .map(({ descendantName }) => `(${descendantName},`)
        .join('')
        .slice(0, -1) + Array(sortedDescendants.length + 1).join(')')
    );
  }
}
