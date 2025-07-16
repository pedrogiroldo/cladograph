import { TraitObjectsArray } from "@/models/traitsTypes";
import { getDescendants } from "../cacheManager/descendantsCRUD";
import { getTraits, saveTraits } from "../cacheManager/traitsCRUD";
import { DescendantObjectsArray } from "@/models/descendantsTypes";

export default class UpdateTraitsWithItsDescendants {
  private traits: TraitObjectsArray | undefined;
  private descendants: DescendantObjectsArray | undefined;

  constructor() {
    this.descendants = getDescendants();
    this.traits = getTraits();

    const newTraitArray = this.traits?.map((trait) => {
      let descendantsIds: number[] = [];

      this.descendants?.forEach((descendant) => {
        if (descendant.traitsIds.includes(trait.id)) {
          descendantsIds.push(descendant.id);
        }
      });
      return {
        ...trait,
        descendants: descendantsIds,
      };
    });

    if (newTraitArray !== undefined) {
      saveTraits(newTraitArray);
    }
  }
}
