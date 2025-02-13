//@ts-nocheck
export function normalizeRolesWithPermissionsData(response) {
  if (!response) return [];
  return response.data.map((item) => {
    const { id, attributes, relationships } = item;
    const permissions = relationships.permissions.data.map((permission) => ({
      id: permission.id,
      name: permission.attributes.name,
      label: permission.attributes.label,
      description: permission.attributes.description,
    }));

    return {
      id,
      title: attributes.name,
      permissions,
    };
  });
}

export function normalizeRoleData(response) {
  const roleData = response.data;
  const includedPermissions = response.included;

  const normalizedRole = {
    id: roleData.id,
    ...roleData.attributes,
    permissions: [],
  };

  const permissionIds = roleData.relationships.permissions.data.map(
    (permission) => permission.id
  );

  permissionIds.forEach((id) => {
    const permission = includedPermissions.find((perm) => perm.id === id);
    if (permission) {
      normalizedRole.permissions.push({
        id: permission.id,
        ...permission.attributes,
      });
    }
  });

  return normalizedRole;
}

export const getCheckedKeys = (data) => {
  if (!data || typeof data !== "object") {
    return []; // Return an empty array if data is null, undefined, or not an object
  }
  return Object.keys(data).filter((key) => data[key] === true);
};
