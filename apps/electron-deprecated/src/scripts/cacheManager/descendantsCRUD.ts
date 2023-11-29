import { DescendantObjectsArray } from '../../models/descendantsTypes';

/**
 *
 * @returns descendants object array or undefined
 */
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

/**
 *
 * @param {DescendantObjectsArray} descendantObjectsArray - the object which contains the descendants who will be saved
 * @returns saved descendants object
 */
export function saveDescendants(
  descendantObjectsArray: DescendantObjectsArray,
): DescendantObjectsArray {
  sessionStorage.setItem(
    'descendantObjectsArray',
    JSON.stringify(descendantObjectsArray),
  );

  return descendantObjectsArray;
}

/**
 *
 * @returns the deleted object
 */
export function deleteDescendants() {
  const descendantObjectsArray: string | null = sessionStorage.getItem(
    'descendantObjectsArray',
  );
  sessionStorage.removeItem('descendantObjectsArray');

  if (descendantObjectsArray === null) return null;

  const parsedDescendantObjectsArray: DescendantObjectsArray = JSON.parse(
    descendantObjectsArray,
  );

  return parsedDescendantObjectsArray;
}
