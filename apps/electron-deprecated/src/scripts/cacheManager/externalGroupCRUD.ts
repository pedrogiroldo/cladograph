import { ExternalGroup } from '../../models/externalGroupTypes';

export function saveExternalGroup(externalGroup: ExternalGroup) {
  sessionStorage.setItem('externalGroup', JSON.stringify(externalGroup));
  return externalGroup;
}

export function getExternalGroup(): ExternalGroup | undefined {
  const externalGroup: string | null = sessionStorage.getItem('externalGroup');
  if (externalGroup === null) return undefined;

  const parsedExternalGroup: ExternalGroup = JSON.parse(externalGroup);

  return parsedExternalGroup;
}

export function deleteExternalGroup() {
  const externalGroup: string | null = sessionStorage.getItem('externalGroup');
  sessionStorage.removeItem('externalGroup');

  if (externalGroup === null) return null;

  const parsedExternalGroup: ExternalGroup = JSON.parse(externalGroup);

  return parsedExternalGroup;
}
