export function processData(data: any) {
  const allRoles = data.flatMap((skill: any) => {
    const roles = skill.roleRequired;
    return roles;
  });
  // Remove duplicates from array
  const uniqueRoles = Array.from(new Set(allRoles));
  const skillsByRole = uniqueRoles.map((role: any) => {
    const skills = data.filter((skill: any) => {
      return skill.roleRequired.includes(role);
    });
    return {
      role,
      skills,
    };
  });

  return {
    uniqueRoles,
    skillsByRole,
  };
}
