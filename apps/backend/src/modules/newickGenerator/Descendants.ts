import { DescendantObjectsArray } from 'src/models/descendantsTypes';

export default class Descendants {
  private unprocessedDescendants: DescendantObjectsArray;
  private descendants: DescendantObjectsArray;
  private deletedDescendants: DescendantObjectsArray;

  public setDescendants(descendants: DescendantObjectsArray) {
    this.unprocessedDescendants = descendants;
    this.filterNonActiveDescendants();
    return descendants;
  }

  public getDescendants() {
    return this.descendants;
  }

  public getDeletedDescendants() {
    return this.deletedDescendants;
  }

  private filterNonActiveDescendants() {
    this.descendants = this.filterActivatedDescendants();
    this.deletedDescendants = this.filterDeactivatedDescendants();
  }

  private filterActivatedDescendants() {
    return this.unprocessedDescendants
      .map((descendant) => {
        if (descendant.active !== true) {
          return null;
        }

        return descendant;
      })
      .filter((descendant) => descendant !== null);
  }

  private filterDeactivatedDescendants() {
    return this.unprocessedDescendants
      .map((descendant) => {
        if (descendant.active !== true) {
          return descendant;
        }

        return null;
      })
      .filter((descendant) => descendant !== null);
  }
}
