export interface Descendant {
  id: number;
  descendantName: string;
  traitsIds: Array<number>;
  active: boolean;
  synapomorphies?: number;
  plesiomorphies?: number;
  apomorphines?: number;
}

export type DescendantObjectsArray = Array<Descendant>;
