import { TraitObjectsArray } from 'src/models/traitsTypes';

export default class TraitsManager {
  private unprocessedTraits: TraitObjectsArray;
  private traits: TraitObjectsArray;
  private deactivatedTraits: TraitObjectsArray;

  public setTraits(traits: TraitObjectsArray) {
    this.unprocessedTraits = traits;
    this.filterNonActiveTraits();
    return traits;
  }

  public getTraits() {
    return this.traits;
  }

  public getDeletedTraits() {
    return this.deactivatedTraits;
  }

  private filterNonActiveTraits() {
    this.traits = this.filterOnlyActivatedTraits();
    this.deactivatedTraits = this.filterOnlyDeactivatedTraits();
  }

  private filterOnlyActivatedTraits() {
    return this.unprocessedTraits
      .map((trait) => {
        if (trait.active !== true) {
          return null;
        }

        return trait;
      })
      .filter((trait) => trait !== null);
  }

  private filterOnlyDeactivatedTraits() {
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
