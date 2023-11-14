import { TraitsObject } from '../../models/traitsTypes';

export function getTraits(): TraitsObject | undefined {
  const traitsObject: string | null = sessionStorage.getItem('traitsObject');
  if (traitsObject === null) return undefined;

  const parsedTraits: TraitsObject = JSON.parse(traitsObject);

  return parsedTraits;
}

export function saveTraits(traitsObject: TraitsObject) {
  sessionStorage.setItem('traitsObject', JSON.stringify(traitsObject));

  return traitsObject;
}

export function deleteTraits() {
  const traitsObject: string | null = sessionStorage.getItem('traitsObject');
  sessionStorage.removeItem('traitsObject');

  if (traitsObject === null) return null;

  const parsedTraitsObject: TraitsObject = JSON.parse(traitsObject);

  return parsedTraitsObject;
}
