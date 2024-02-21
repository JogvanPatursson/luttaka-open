export type UserProfileDto = {
  userId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  title?: string;
  description?: string;
  socials?: string;
  company?: string;
  avatarUrl?: string;
  initials: string;
}