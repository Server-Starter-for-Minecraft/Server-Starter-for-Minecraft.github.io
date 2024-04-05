export interface MemberProp {
  role: 'owner' | 'chief' | 'member';
  name: string;
  githubLink?: string;
  twitterLink?: string;
}