export interface MemberProp {
  role: 'owner' | 'chief' | 'member';
  name: string;
  githubLink?: string | undefined;
  twitterLink?: string | undefined;
}
