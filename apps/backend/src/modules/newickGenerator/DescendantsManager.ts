import { DescendantObjectsArray } from 'src/models/descendantsTypes';
import { TraitObjectsArray } from 'src/models/traitsTypes';

export default class DescendantsManager {
  private unprocessedDescendants: DescendantObjectsArray;
  private descendants: DescendantObjectsArray;
  private deactivatedDescendants: DescendantObjectsArray;

  public setDescendants(descendants: DescendantObjectsArray) {
    this.unprocessedDescendants = descendants;

    this.filterNonActiveDescendants();
    return descendants;
  }

  public getDescendants() {
    return this.descendants;
  }

  public getDeletedDescendants() {
    return this.deactivatedDescendants;
  }

  private filterNonActiveDescendants() {
    this.descendants = this.filterOnlyActivatedDescendants();
    this.deactivatedDescendants = this.filterOnlyDeactivatedDescendants();
  }

  private filterOnlyActivatedDescendants() {
    return this.unprocessedDescendants
      .map((descendant) => {
        if (descendant.active !== true) {
          return null;
        }

        return descendant;
      })
      .filter((descendant) => descendant !== null);
  }

  private filterOnlyDeactivatedDescendants() {
    return this.unprocessedDescendants
      .map((descendant) => {
        if (descendant.active !== true) {
          return descendant;
        }

        return null;
      })
      .filter((descendant) => descendant !== null);
  }

  public removeDeletedTraitsFromBothTypesOfDescendants(traits) {
    this.descendants = this.deleteDeactivatedTraits(this.descendants, traits);
    this.deactivatedDescendants = this.deleteDeactivatedTraits(
      this.deactivatedDescendants,
      traits,
    );
  }

  private deleteDeactivatedTraits(
    descendants: DescendantObjectsArray,
    traits: TraitObjectsArray,
  ): DescendantObjectsArray {
    const newDescendants = descendants.map((descendant) => {
      const traitList = traits
        .map((trait) => {
          if (trait !== null && descendant.traitsIds.includes(trait.id)) {
            return trait.id;
          }
          return null;
        })
        .filter((trait) => trait !== null);
      return {
        ...descendant,
        traitsIds: traitList,
      };
    });

    return newDescendants;
  }
}
