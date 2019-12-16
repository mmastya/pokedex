export interface Pokemon {
  id: number;
  name: string;
  avatar: string;
  types: string[];
  stats: Array<{
    base_stat: number;
    effort: number;
    name: string;
  }>;
}
