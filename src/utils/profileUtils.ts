export const isValidProfile = (profile: any): boolean => {
  if (!profile) return false;

  return Boolean(
    profile.nickname?.trim() ||
    profile.firstName?.trim() ||
    profile.lastName?.trim()
  );
};

export const getDisplayName = (profile: any): string => {
  return (
    profile?.nickname?.trim() ||
    profile?.firstName?.trim() ||
    "there"
  );
};