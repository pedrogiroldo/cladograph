export interface Descendant {
  id: number;
  descendantName: string;
  traitsIds: Array<number>;
  active: boolean;
}

export type DescendantObjectsArray = Array<Descendant>;
