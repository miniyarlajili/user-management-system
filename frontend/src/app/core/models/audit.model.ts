export interface Audit {
  id: number;
  utilisateur: { nom: string; email: string };
  action: string;
  description: string;
  date: string;
}
