import { DescendantObjectsArray } from "./descendantsTypes";

export interface Trait {
  id: number;
  traitName: string;
  lastTraitName: string | undefined; // help to handle errors it's a possbile function for this
  active: boolean; // save the history of traits
  descendantsIds: number[] | undefined;
}

export type TraitObjectsArray = Array<Trait>;
