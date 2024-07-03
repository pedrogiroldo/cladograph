import { TraitObjectsArray } from 'src/models/traitsTypes';

export default class Traits {
  private unprocessedTraits: TraitObjectsArray;
  private traits: TraitObjectsArray;
  private deletedTraits: TraitObjectsArray;

  public setTraits(traits: TraitObjectsArray) {
    this.unprocessedTraits = traits;
    this.filterNonActiveTraits();
    return traits;
  }

  public getTraits() {
    return this.traits;
  }

  public getDeletedTraits() {
    return this.deletedTraits;
  }

  private filterNonActiveTraits() {
    this.traits = this.filterActivatedTraits();
    this.deletedTraits = this.filterDeactivatedTraits();
  }

  private filterActivatedTraits() {
    return this.unprocessedTraits
      .map((trait) => {
        if (trait.active !== true) {
          return null;
        }

        return trait;
      })
      .filter((trait) => trait !== null);
  }

  private filterDeactivatedTraits() {
    return this.unprocessedTraits
      .map((trait) => {
        if (trait.active !== true) {
          return trait;
        }

        return null;
      })
      .filter((trait) => trait !== null);
  }
}
