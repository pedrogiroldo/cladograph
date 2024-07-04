import { ExternalGroup } from 'src/models/externalGroupTypes';
import TraitsManager from './TraitsManager';
import DescendantsManager from './DescendantsManager';
import { Descendant } from 'src/models/descendantsTypes';
import {
  Trait,
  TraitAndNumberOfDescendantsThatHaveThemeObjectsArray,
} from 'src/models/traitsTypes';

export default class NewickGenerator {
  private traits: TraitsManager;
  private traitsAndNumberOfDescendantsThatHaveThem: TraitAndNumberOfDescendantsThatHaveThemeObjectsArray;
  private externalGroup: ExternalGroup;
  private descendants: DescendantsManager;

  constructor(traits, externalGroup, descendants) {
    this.traits.setTraits(traits);
    this.descendants.setDescendants(descendants);
    this.descendants.removeDeletedTraitsFromBothTypesOfDescendants(this.traits);
    this.externalGroup = externalGroup;

    this.generateNewick();
  }

  public generateNewick() {
    this.traitsAndNumberOfDescendantsThatHaveThem =
      this.returnTraitWithNumberOfDescendantsWhoHaveIt();

    const descendants = this.descendants.getDescendants();
    const descendantsWithSinPlesAndApo = descendants.map((descendant) => {
      descendant.synapomorphies = this.calculateSynapomorphies(descendant);
      descendant.plesiomorphies = this.calculatePlesiomorphies(descendant);
      descendant.apomorphies = this.calculateApomorphies(descendant);
    });

    const sortedDescendants = descendantsWithSinPlesAndApo.sort(
      this.compareDescendants,
    );

    return sortedDescendants;
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
    return this.descendants.getDescendants().reduce((count, descendant) => {
      if (descendant.traitsIds.includes(trait.id)) {
        return count + 1;
      }
      return count;
    }, 0);
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
            traitWithNumberOfDescendants.id = traitId;
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
            traitWithNumberOfDescendants.id = trait.id;
          },
        ).descendants <
          this.descendants.getDescendants().length - 1
      ) {
        synapomorphies += 1;
      }
    });

    return synapomorphies;
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
            traitWithNumberOfDescendants.id = traitId;
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
            traitWithNumberOfDescendants.id = trait.id;
          },
        ).descendants ===
          this.descendants.getDescendants().length - 1
      ) {
        apomorphies += 1;
      }
    });

    return apomorphies;
  }

  private compareDescendants(a: any, b: any) {
    if (a.synapomorphies !== b.synapomorphies) {
      return a.synapomorphies - b.synapomorphies; // Ordena por Sin em ordem descendente
    } else if (a.plesiomorphies !== b.plesiomorphies) {
      return b.plesiomorphies - a.plesiomorphies; // Ordena por Ples em ordem ascendente
    } else {
      return a.apomorphies - b.apomorphies; // Ordena por Apo em ordem descendente
    }
  }
}
