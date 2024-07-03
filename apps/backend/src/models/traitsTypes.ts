export interface Trait {
  id: number;
  traitName: string;
  lastTraitName: string | undefined; // help to handle errors it's a possible function for this
  active: boolean; // save the history of traits
}

export type TraitObjectsArray = Array<Trait>;
