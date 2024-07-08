export const mockDescendants = [
  {
    id: 2,
    descendantName: '2',
    traitsIds: [1, 2, 3, 6, 7, 8, 10, 11],
    active: true,
    synapomorphies: 0,
    plesiomorphies: 0,
    apomorphies: 0,
  },
  {
    id: 1,
    descendantName: '1',
    traitsIds: [1, 2, 5, 6, 8, 9, 10, 13, 14],
    active: true,
    synapomorphies: 0,
    plesiomorphies: 0,
    apomorphies: 0,
  },
  {
    id: 4,
    descendantName: '4',
    traitsIds: [4, 5, 7, 10, 11, 12, 13],
    active: true,
    synapomorphies: 0,
    plesiomorphies: 0,
    apomorphies: 0,
  },
  {
    id: 3,
    descendantName: '3',
    traitsIds: [2, 3, 5, 6, 8, 9, 12, 13],
    active: true,
    synapomorphies: 0,
    plesiomorphies: 0,
    apomorphies: 0,
  },
  {
    id: 5,
    descendantName: '5',
    traitsIds: [2, 3, 4, 5, 6, 8, 9, 11, 12, 13],
    active: true,
    synapomorphies: 0,
    plesiomorphies: 0,
    apomorphies: 0,
  },
];

export const mockTraits = [
  {
    id: 14,
    traitName: 'n',
    active: true,
  },
  {
    id: 13,
    traitName: 'm',
    active: true,
  },
  {
    id: 12,
    traitName: 'l',
    active: true,
  },
  {
    id: 11,
    traitName: 'k',
    active: true,
  },
  {
    id: 10,
    traitName: 'j',
    active: true,
  },
  {
    id: 9,
    traitName: 'i',
    active: true,
  },
  {
    id: 8,
    traitName: 'h',
    active: true,
  },
  {
    id: 7,
    traitName: 'g',
    active: true,
  },
  {
    id: 6,
    traitName: 'f',
    active: true,
  },
  {
    id: 5,
    traitName: 'e',
    active: true,
  },
  {
    id: 4,
    traitName: 'd',
    active: true,
  },
  {
    id: 3,
    traitName: 'c',
    active: true,
  },
  {
    id: 2,
    traitName: 'b',
    active: true,
  },
  {
    id: 1,
    traitName: 'a',
    active: true,
  },
];

export const mockExternalGroup = {
  traitsIds: [1],
};

export const mockExpectedNewick = '(2,(1,(4,(3,(5)))))';

export const mockExpectedDescendants = [
  {
    id: 2,
    descendantName: '2',
    traitsIds: [1, 2, 3, 6, 7, 8, 10, 11],
    active: true,
    synapomorphies: 7,
    plesiomorphies: 7,
    apomorphies: 0,
  },
  {
    id: 1,
    descendantName: '1',
    traitsIds: [1, 2, 5, 6, 8, 9, 10, 13, 14],
    active: true,
    synapomorphies: 7,
    plesiomorphies: 6,
    apomorphies: 1,
  },
  {
    id: 4,
    descendantName: '4',
    traitsIds: [4, 5, 7, 10, 11, 12, 13],
    active: true,
    synapomorphies: 8,
    plesiomorphies: 6,
    apomorphies: 0,
  },
  {
    id: 3,
    descendantName: '3',
    traitsIds: [2, 3, 5, 6, 8, 9, 12, 13],
    active: true,
    synapomorphies: 9,
    plesiomorphies: 5,
    apomorphies: 0,
  },
  {
    id: 5,
    descendantName: '5',
    traitsIds: [2, 3, 4, 5, 6, 8, 9, 11, 12, 13],
    active: true,
    synapomorphies: 11,
    plesiomorphies: 3,
    apomorphies: 0,
  },
];
