import { ExternalGroup } from '../../models/externalGroupTypes';

/**
 *
 * @param {ExternalGroup} externalGroup the object which contains the external group who will be saved
 * @returns saved external group object
 */
export function saveExternalGroup(externalGroup: ExternalGroup) {
  sessionStorage.setItem('externalGroup', JSON.stringify(externalGroup));
  return externalGroup;
}

/**
 *
 * @returns external group object array or null
 */
export function getExternalGroup(): ExternalGroup | undefined {
  const externalGroup: string | null = sessionStorage.getItem('externalGroup');
  if (externalGroup === null) return undefined;

  const parsedExternalGroup: ExternalGroup = JSON.parse(externalGroup);

  return parsedExternalGroup;
}

/**
 *
 * @returns deleted external group
 */
export function deleteExternalGroup() {
  const externalGroup: string | null = sessionStorage.getItem('externalGroup');
  sessionStorage.removeItem('externalGroup');

  if (externalGroup === null) return null;

  const parsedExternalGroup: ExternalGroup = JSON.parse(externalGroup);

  return parsedExternalGroup;
}
