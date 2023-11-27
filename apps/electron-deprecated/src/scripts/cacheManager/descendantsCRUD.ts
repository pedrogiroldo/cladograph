import { DescendantObjectsArray } from '../../models/descendantsTypes';

export function getDescendants(): DescendantObjectsArray | undefined {
  const descendantObjectsArray: string | null = sessionStorage.getItem(
    'descendantObjectsArray',
  );
  if (descendantObjectsArray === null) return undefined;

  const parsedDescendantObjectsArray: DescendantObjectsArray = JSON.parse(
    descendantObjectsArray,
  );

  return parsedDescendantObjectsArray;
}

export function saveDescendants(
  descendantObjectsArray: DescendantObjectsArray,
): DescendantObjectsArray {
  sessionStorage.setItem(
    'descendantObjectsArray',
    JSON.stringify(descendantObjectsArray),
  );

  return descendantObjectsArray;
}

export function deleteDescendants() {
  const descendantObjectsArray: string | null = sessionStorage.getItem(
    'descendantObjectsArray',
  );
  sessionStorage.removeItem('descendantObjectsArray');

  if (descendantObjectsArray === null) return null;

  const parsedTraitsObject: DescendantObjectsArray = JSON.parse(
    descendantObjectsArray,
  );

  return parsedTraitsObject;
}
