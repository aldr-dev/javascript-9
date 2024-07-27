export interface ApiCategory {
  type: string;
  name: string;
}

export interface MutationApiCategory extends ApiCategory{
  id: string;
}