import { Traits } from '../../models/traitsTypes';

export function saveTraits(traits: Traits) {
  sessionStorage.setItem('traits', JSON.stringify(traits));
  return traits;
}

export function getTraits(): Traits | undefined {
  const traits: string | null = sessionStorage.getItem('traits');
  if (traits === null) return undefined;

  const parsedTraits: Traits = JSON.parse(traits);

  return parsedTraits;
}

export function deleteTraits() {
  const traits: string | null = sessionStorage.getItem('traits');
  sessionStorage.removeItem('traits');

  if (traits === null) return null;

  const parsedTraits: Traits = JSON.parse(traits);

  return parsedTraits;
}
