export interface ApiCategory {
  id: string;
  type: string;
  name: string;
}

export type ApiCategoryMutation = Omit<ApiCategory, 'type'>

export interface FetchApiCategory {
  [id: string]: Omit<ApiCategory, 'id'>;
}

export interface MutationApiCategory extends ApiCategory{
  id: string;
}

export type CategoryMutation = Omit<ApiCategory, 'type'>

export interface TransactionForm {
  category: string;
  amount: string;
  createdAt: string;
}

export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}

export interface Transaction extends ApiTransaction{
  id: string;
  amount: number;
  type: string;
}

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface TransactionMutate {
  type: string,
  name: string,
  amount: string;
}