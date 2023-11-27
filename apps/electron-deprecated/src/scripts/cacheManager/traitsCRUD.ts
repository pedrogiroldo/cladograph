import { TraitObjectsArray } from '../../models/traitsTypes';

export function getTraits(): TraitObjectsArray | undefined {
  const traitObjectsArray: string | null =
    sessionStorage.getItem('traitObjectsArray');
  if (traitObjectsArray === null) return undefined;

  const parsedTraits: TraitObjectsArray = JSON.parse(traitObjectsArray);

  return parsedTraits;
}

export function saveTraits(traitObjectsArray: TraitObjectsArray) {
  sessionStorage.setItem(
    'traitObjectsArray',
    JSON.stringify(traitObjectsArray),
  );

  return traitObjectsArray;
}

export function deleteTraits() {
  const traitObjectsArray: string | null =
    sessionStorage.getItem('traitObjectsArray');
  sessionStorage.removeItem('traitsObject');

  if (traitObjectsArray === null) return null;

  const parsedTraitsObject: TraitObjectsArray = JSON.parse(traitObjectsArray);

  return parsedTraitsObject;
}
