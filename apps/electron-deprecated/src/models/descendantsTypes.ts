export interface Descendant {
  id: number;
  descendantName: string;
  active: boolean;
}

export type DescendantObjectsArray = Array<Descendant>;

export type DescendantTraitRelationsArray = Array<number[]>;
