export interface Trait {
  id: string;
  traitName: string;
  lastTraitName: string | undefined; // help to handle errors it's a possbile function for this
  active: boolean; // save the history of traits
}

export type TraitsObject = Trait[];
